/**
 * Sanitize HTML content to prevent XSS attacks
 * This is a basic sanitizer - for production, consider using DOMPurify
 * @param {string} html - HTML content to sanitize
 * @returns {string} - Sanitized HTML
 */
export function sanitizeHtml(html) {
  if (!html) return "";

  // Allowed tags
  const allowedTags = [
    "p", "br", "span", "div",
    "h1", "h2", "h3", "h4", "h5", "h6",
    "strong", "b", "em", "i", "u", "s", "mark",
    "ul", "ol", "li",
    "a", "img",
    "blockquote", "code", "pre",
    "table", "thead", "tbody", "tr", "th", "td",
    "hr"
  ];

  // Allowed attributes per tag
  const allowedAttributes = {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title", "width", "height"],
    "*": ["class", "id"] // Global attributes
  };

  // This is a simplified sanitizer
  // For production, use a library like DOMPurify or isomorphic-dompurify

  // Remove script tags and their content
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

  // Remove on* event handlers
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, "");
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, "");

  // Remove javascript: protocol in links
  sanitized = sanitized.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"');

  // Remove data: protocol in images (except data:image)
  sanitized = sanitized.replace(/src\s*=\s*["']data:(?!image)[^"']*["']/gi, 'src=""');

  // Remove style tags
  sanitized = sanitized.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");

  // Remove iframe, object, embed tags
  sanitized = sanitized.replace(/<(iframe|object|embed|form)\b[^<]*(?:(?!<\/\1>)<[^<]*)*<\/\1>/gi, "");

  return sanitized;
}
