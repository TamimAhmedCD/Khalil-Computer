/**
 * Calculate reading time for content
 * @param {string} html - HTML content
 * @returns {number} - Reading time in minutes (rounded up)
 */
export function calculateReadingTime(html) {
  if (!html) return 1;

  // Strip HTML tags
  const text = html.replace(/<[^>]*>/g, " ");

  // Count words (split by whitespace and filter empty strings)
  const words = text.split(/\s+/).filter(word => word.length > 0).length;

  // Average reading speed: 200 words per minute
  const minutes = words / 200;

  // Round up to at least 1 minute
  return Math.max(1, Math.ceil(minutes));
}
