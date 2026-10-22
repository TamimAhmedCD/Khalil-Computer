/**
 * Convert a string to a URL-safe slug
 * Keeps Bangla text for URL support
 * Pure utility function - Safe for both Client and Server
 */
export function slugify(text) {
  if (!text) return "";

  return text
    .toString()
    .toLowerCase()
    .trim()
    // Replace spaces with hyphens
    .replace(/\s+/g, "-")
    // Keep English chars, numbers, hyphens, AND Bangla characters (U+0980 to U+09FF)
    .replace(/[^\w\-ঀ-৿]+/g, "")
    // Replace multiple hyphens with single hyphen
    .replace(/\-\-+/g, "-")
    // Remove leading/trailing hyphens
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}
