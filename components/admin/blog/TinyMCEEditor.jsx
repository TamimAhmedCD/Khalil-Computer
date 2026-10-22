"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";

const Editor = dynamic(() => import("@tinymce/tinymce-react").then((mod) => mod.Editor), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full rounded-lg bg-gray-100 animate-pulse flex items-center justify-center">
      <span className="text-muted-foreground">রিচ টেক্সট এডিটর লোড হচ্ছে...</span>
    </div>
  ),
});

export default function TinyMCEEditor({ value, onChange }) {
  const editorRef = useRef(null);

  const handleImageUpload = async (blobInfo) => {
    return new Promise((resolve, reject) => {
      try {
        const blob = blobInfo.blob();
        const file = new File([blob], "blog-image.jpg", { type: blob.type });

        uploadToCloudinary(file, "khalilcomputer/blogs")
          .then((result) => {
            resolve(result.secure_url);
          })
          .catch((err) => {
            reject("Image upload failed: " + err.message);
          });
      } catch (err) {
        reject("Image upload failed: " + err.message);
      }
    });
  };

  const apiKey =
    process.env.NEXT_PUBLIC_TINY_MCE ||
    process.env.NEXT_PUBLIC_TINYMCE_API_KEY ||
    "e1y0yqn5lxw51oe3jwo9vdku6aowry1j3aezbi1xsdk4ho4a";

  const init = {
    height: 500,
    menubar: true,
    plugins: [
      "accordion", "advlist", "anchor", "autolink", "autoresize", "autosave",
      "charmap", "code", "codesample", "directionality", "emoticons", "fullscreen",
      "help", "image", "importcss", "insertdatetime", "link", "lists", "media",
      "nonbreaking", "pagebreak", "preview", "quickbars", "save", "searchreplace",
      "table", "visualblocks", "visualchars", "wordcount"
    ],
    toolbar:
      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | " +
      "link image media table | align lineheight | numlist bullist indent outdent | " +
      "emoticons charmap | removeformat | code fullscreen preview",
    content_style:
      "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6 }",
    image_caption: true,
    image_advtab: true,
    image_uploadtab: true,
    images_upload_handler: handleImageUpload,
    branding: false,
    placeholder: "ব্লগের কন্টেন্ট লিখুন...",
    skin: "oxide",
    content_css: "default",
    promotion: false,
  };

  return (
    <Editor
      apiKey={apiKey}
      onInit={(evt, editor) => {
        editorRef.current = editor;
        if (value && editor.getContent() !== value) {
          editor.setContent(value);
        }
      }}
      onEditorChange={(content) => onChange(content)}
      initialValue={value || ""}
      init={init}
    />
  );
}
