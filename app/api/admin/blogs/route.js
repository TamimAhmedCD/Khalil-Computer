import { NextResponse } from "next/server";
import { collection } from "@/lib/mongodb";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import { deleteFromCloudinary } from "@/lib/cloudinaryHelper";
import { slugify } from "@/lib/slugify";
import { generateUniqueSlug } from "@/lib/serverSlugify";
import { calculateReadingTime } from "@/lib/readingTime";
import { sanitizeHtml } from "@/lib/sanitizeHtml";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    console.log("Blog API: POST request received");
    const contentType = req.headers.get("content-type") || "";
    let data = {};
    let coverImageFile = null;
    let oldImageUrl = null;

    // Parse form data or JSON
    if (contentType.includes("multipart/form-data")) {
      console.log("Parsing multipart/form-data");
      const formData = await req.formData();

      // Debug: log form data entries
      const entries = [];
      for (const [key, value] of formData.entries()) {
        entries.push({ key, type: typeof value, isFile: value instanceof File });
      }
      console.log("Form data entries:", entries);

      // Reset and parse properly
      for (const [key, value] of formData.entries()) {
        if (key === "coverImage" || key === "coverImageFile") {
          if (value instanceof File && value.size > 0 && value.name !== "undefined") {
            console.log("Found cover image file:", value.name, value.size);
            coverImageFile = value;
          } else if (typeof value === "string") {
            data[key] = value;
          }
        } else if (key === "oldCoverImage") {
          oldImageUrl = value;
        } else if (key === "tags") {
          // Parse tags from JSON string
          try {
            if (typeof value === "string") {
              const parsed = JSON.parse(value);
              // If it's an array of objects like [{_id: "..."}], extract just the _id values
              if (Array.isArray(parsed)) {
                data.tags = parsed.map(item => {
                  if (item && typeof item === "object" && item._id) {
                    return item._id;
                  }
                  return item;
                });
              } else {
                data.tags = parsed;
              }
              console.log("Parsed tags:", data.tags);
            }
          } catch (err) {
            console.warn("Failed to parse tags JSON:", err.message);
            data[key] = value;
          }
        } else if (key === "seo" && typeof value === "string") {
          // Parse seo object from JSON string
          try {
            data.seo = JSON.parse(value);
          } catch {
            data.seo = {};
          }
        } else if (key === "featured") {
          data[key] = value === "true" || value === true;
        } else if (key === "publishedAt") {
          data[key] = value ? new Date(value) : null;
        } else if (key === "categoryId" && value) {
          data.categoryId = value;
        } else if (key === "content") {
          data.content = value;
        } else if (key === "title") {
          data.title = value;
        } else if (key === "slug") {
          data.slug = value;
        } else if (key === "excerpt") {
          data.excerpt = value;
        } else if (key === "status") {
          data.status = value;
        } else if (key === "coverImageAlt") {
          data.coverImageAlt = value;
        } else if (key && value !== undefined) {
          data[key] = value;
        }
      }
    } else {
      console.log("Parsing JSON data");
      data = await req.json();
      // Handle base64 cover images
      if (data.coverImage && typeof data.coverImage === "string" && data.coverImage.startsWith("data:image")) {
        const base64Data = data.coverImage.split(",")[1];
        const mimeMatch = data.coverImage.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,/);
        const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
        const buffer = Buffer.from(base64Data, "base64");
        const blob = new Blob([buffer], { type: mimeType });
        coverImageFile = new File([blob], "blog-cover.jpg", { type: mimeType });
      }
      oldImageUrl = data.oldCoverImage;
    }

    console.log("Parsed data:", {
      ...data,
      content: data.content ? `${data.content.substring(0, 100)}...` : "empty",
      hasTags: !!data.tags,
      hasCoverImage: !!coverImageFile,
      _id: data._id,
    });

    const { _id, coverImage, ...rest } = data;

    // Generate slug if not provided or empty
    if (!rest.slug && rest.title) {
      const slug = slugify(rest.title);
      const uniqueSlug = await generateUniqueSlug(slug, () => collection("blogs"), _id);
      rest.slug = uniqueSlug;
      console.log("Generated slug:", uniqueSlug, "from title:", rest.title);
    } else if (!rest.slug) {
      // Only use untitled-blog if there's absolutely no title
      const slug = slugify("untitled-blog");
      const uniqueSlug = await generateUniqueSlug(slug, () => collection("blogs"), _id);
      rest.slug = uniqueSlug;
      console.log("Used fallback slug:", uniqueSlug);
    }

    // Sanitize HTML content
    if (rest.content) {
      rest.content = sanitizeHtml(rest.content);
    }

    // Calculate reading time
    if (rest.content && !rest.readingTime) {
      rest.readingTime = calculateReadingTime(rest.content);
    }

    // Handle cover image upload
    let imageUrl = typeof coverImage === "string" ? coverImage : (oldImageUrl || "");
    const blogsCol = await collection("blogs");

    console.log("Image upload check:", {
      hasCoverImageFile: !!coverImageFile,
      hasOldImageUrl: !!oldImageUrl,
      coverImageType: coverImageFile ? coverImageFile.constructor.name : "none",
    });

    // Delete old image from Cloudinary if new image is provided
    if (coverImageFile && oldImageUrl && oldImageUrl.includes("cloudinary")) {
      try {
        await deleteFromCloudinary(oldImageUrl);
        console.log("Deleted old blog cover image from Cloudinary:", oldImageUrl);
      } catch (deleteError) {
        console.warn("Failed to delete old image:", deleteError.message);
      }
    }

    // Upload to Cloudinary if new image provided
    if (coverImageFile) {
      console.log("Uploading cover image to Cloudinary...", {
        fileName: coverImageFile.name,
        fileSize: coverImageFile.size,
        fileType: coverImageFile.type,
      });
      try {
        const uploadResult = await uploadToCloudinary(coverImageFile, "khalilcomputer/blogs");
        imageUrl = uploadResult.secure_url;
        console.log("Successfully uploaded to Cloudinary:", imageUrl);
      } catch (uploadError) {
        console.error("Failed to upload to Cloudinary:", uploadError);
        throw new Error(`Image upload failed: ${uploadError.message}`);
      }
    } else {
      console.log("No cover image file to upload");
    }

    // Determine published status
    if (!rest.status && rest.publishedAt) {
      rest.status = "published";
    } else if (!rest.status) {
      rest.status = "draft";
    }

    if (_id && ObjectId.isValid(_id)) {
      // UPDATE blog
      const updateData = {
        ...rest,
        coverImage: imageUrl,
        updatedAt: new Date(),
      };

      // Clean up undefined/null values
      Object.keys(updateData).forEach(key => {
        if (updateData[key] === undefined || updateData[key] === null) {
          delete updateData[key];
        }
      });

      const result = await blogsCol.updateOne(
        { _id: new ObjectId(_id) },
        { $set: updateData }
      );

      return NextResponse.json({
        success: true,
        message: "Blog updated successfully",
        result,
      });
    } else {
      // CREATE new blog
      const newBlog = {
        ...rest,
        coverImage: imageUrl,
        coverImageAlt: rest.coverImageAlt || "",
        authorId: data.authorId || "system",
        authorName: data.authorName || "Khalil Computer",
        createdAt: new Date(),
        viewCount: 0,
        featured: false,
      };

      // Clean up undefined/null values
      Object.keys(newBlog).forEach(key => {
        if (newBlog[key] === undefined || newBlog[key] === null) {
          delete newBlog[key];
        }
      });

      const result = await blogsCol.insertOne(newBlog);

      return NextResponse.json({
        success: true,
        message: "Blog added successfully",
        blogId: result.insertedId,
      });
    }
  } catch (err) {
    console.error("Blog API Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const blogsCol = await collection("blogs");

    // Build query
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    if (status && status !== "all") {
      query.status = status;
    }

    if (category && category !== "all") {
      query.categoryId = new ObjectId(category);
    }

    if (featured !== null && featured !== undefined) {
      query.featured = featured === "true";
    }

    const skip = (page - 1) * limit;

    // Get total count
    const total = await blogsCol.countDocuments(query);

    // Get paginated results with population
    const blogs = await blogsCol
      .find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("GET blogs error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
