import { collection } from "@/lib/mongodb";

/**
 * Fetch all published blogs by category slug
 * @param {string} slug - Category slug
 * @returns {Promise<Object>} - Paginated blogs data
 */
export async function fetchBlogsByCategory(slug) {
  try {
    const categories = collection("blogCategories");
    const blogs = collection("blogs");

    const category = await categories.findOne({ slug, status: "active" });
    if (!category) {
      return { blogs: [] };
    }

    const categoryBlogs = await blogs
      .find({
        categoryId: category._id,
        status: "published",
        publishedAt: { $lte: new Date() },
      })
      .sort({ publishedAt: -1, createdAt: -1 })
      .toArray();

    return {
      blogs: categoryBlogs,
      pagination: {
        page: 1,
        pages: 1,
        total: categoryBlogs.length,
      },
      category,
    };
  } catch (error) {
    console.error("Error fetching blogs by category:", error);
    return { blogs: [] };
  }
}

/**
 * Fetch all published blogs by tag slug
 * @param {string} slug - Tag slug
 * @returns {Promise<Object>} - Paginated blogs data
 */
export async function fetchBlogsByTag(slug) {
  try {
    const tags = collection("blogTags");
    const blogs = collection("blogs");

    const tag = await tags.findOne({ slug });
    if (!tag) {
      return { blogs: [] };
    }

    const tagBlogs = await blogs
      .find({
        tagIds: tag._id,
        status: "published",
        publishedAt: { $lte: new Date() },
      })
      .sort({ publishedAt: -1, createdAt: -1 })
      .toArray();

    return {
      blogs: tagBlogs,
      pagination: {
        page: 1,
        pages: 1,
        total: tagBlogs.length,
      },
      tag,
    };
  } catch (error) {
    console.error("Error fetching blogs by tag:", error);
    return { blogs: [] };
  }
}

/**
 * Fetch category by slug
 * @param {string} slug - Category slug
 * @returns {Promise<Object|null>} - Category object or null
 */
export async function fetchCategoryBySlug(slug) {
  try {
    const categories = collection("blogCategories");
    const category = await categories.findOne({ slug });
    return category;
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    return null;
  }
}

/**
 * Fetch tag by slug
 * @param {string} slug - Tag slug
 * @returns {Promise<Object|null>} - Tag object or null
 */
export async function fetchTagBySlug(slug) {
  try {
    const tags = collection("blogTags");
    const tag = await tags.findOne({ slug });
    return tag;
  } catch (error) {
    console.error("Error fetching tag by slug:", error);
    return null;
  }
}

/**
 * Get related blogs (same category, matching tags)
 * @param {string} blogId - Current blog ID
 * @param {Object} currentBlog - Current blog object
 * @param {number} limit - Number of related posts to return (default: 3)
 * @returns {Promise<Array>} - Array of related blogs
 */
export async function getRelatedBlogs(blogId, currentBlog, limit = 3) {
  try {
    const blogs = collection("blogs");

    if (!currentBlog.categoryId && (!currentBlog.tagIds || currentBlog.tagIds.length === 0)) {
      return [];
    }

    const query = {
      _id: { $ne: currentBlog._id },
      status: "published",
      publishedAt: { $lte: new Date() },
    };

    const orConditions = [];

    if (currentBlog.categoryId) {
      orConditions.push({ categoryId: currentBlog.categoryId });
    }

    if (currentBlog.tagIds && currentBlog.tagIds.length > 0) {
      orConditions.push({ tagIds: { $in: currentBlog.tagIds } });
    }

    if (orConditions.length === 0) {
      return [];
    }

    if (orConditions.length === 1) {
      query.$or = orConditions;
    } else {
      query.$or = [
        ...orConditions,
        {
          $and: orConditions,
        },
      ];
    }

    const relatedBlogs = await blogs
      .find(query)
      .sort({ featured: -1, publishedAt: -1, createdAt: -1 })
      .limit(limit)
      .toArray();

    return relatedBlogs;
  } catch (error) {
    console.error("Error fetching related blogs:", error);
    return [];
  }
}

/**
 * Fetch blog by slug
 * @param {string} slug - Blog slug
 * @returns {Promise<Object|null>} - Blog object or null
 */
export async function fetchBlogBySlug(slug) {
  try {
    const blogs = collection("blogs");
    const blog = await blogs.findOne({ slug });

    if (!blog) return null;

    // Populate category and tags
    const categories = collection("blogCategories");
    const tags = collection("blogTags");

    const category = blog.categoryId ? await categories.findOne({ _id: blog.categoryId }) : null;
    const blogTags = blog.tagIds && blog.tagIds.length > 0
      ? await tags.find({ _id: { $in: blog.tagIds } }).toArray()
      : [];

    return {
      ...blog,
      categoryName: category?.name,
      categorySlug: category?.slug,
      tags: blogTags,
    };
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
}

/**
 * Get popular blogs based on view count
 * @param {number} limit - Number of blogs to return (default: 5)
 * @returns {Promise<Array>} - Array of popular blogs
 */
export async function getPopularBlogs(limit = 5) {
  try {
    const blogs = collection("blogs");
    const popularBlogs = await blogs
      .find({
        status: "published",
        publishedAt: { $lte: new Date() },
      })
      .sort({ viewCount: -1, publishedAt: -1 })
      .limit(limit)
      .toArray();

    return popularBlogs;
  } catch (error) {
    console.error("Error fetching popular blogs:", error);
    return [];
  }
}

/**
 * Get all active categories with blog count
 * @returns {Promise<Array>} - Array of categories with blog count
 */
export async function getAllCategoriesWithCount() {
  try {
    const categories = collection("blogCategories");
    const blogs = collection("blogs");

    const activeCategories = await categories
      .find({ status: "active" })
      .sort({ name: 1 })
      .toArray();

    const categoriesWithCount = await Promise.all(
      activeCategories.map(async (category) => {
        const count = await blogs.countDocuments({
          categoryId: category._id,
          status: "published",
          publishedAt: { $lte: new Date() },
        });
        return {
          ...category,
          blogCount: count,
        };
      })
    );

    return categoriesWithCount;
  } catch (error) {
    console.error("Error fetching categories with count:", error);
    return [];
  }
}
