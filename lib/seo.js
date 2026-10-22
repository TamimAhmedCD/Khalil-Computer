/**
 * Generate JSON-LD structured data for blog articles
 * @param {Object} blog - Blog post object
 * @param {Object} category - Category object
 * @returns {Object} - JSON-LD structured data
 */
export function generateArticleJsonLd(blog, category) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.coverImage || "",
    datePublished: blog.publishedAt?.toISOString() || blog.createdAt?.toISOString(),
    dateModified: blog.updatedAt?.toISOString() || blog.createdAt?.toISOString(),
    author: {
      "@type": "Person",
      name: blog.authorName || "Khalil Computer",
    },
    publisher: {
      "@type": "Organization",
      name: "Khalil Computer",
      logo: {
        "@type": "ImageObject",
        url: "https://khalilcomputer.com/logo.png", // Update with actual logo URL
      },
    },
    articleSection: category?.name || "Technology",
    keywords: blog.seo?.keywords?.join(", ") || "",
  };
}

/**
 * Generate JSON-LD breadcrumb structured data
 * @param {Array} items - Array of breadcrumb items [{name, url}, ...]
 * @returns {Object} - JSON-LD structured data
 */
export function generateBreadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate organization structured data
 * @returns {Object} - JSON-LD structured data
 */
export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Khalil Computer",
    url: "https://khalilcomputer.com", // Update with actual URL
    logo: "https://khalilcomputer.com/logo.png", // Update with actual logo URL
    description: "Leading computer training institute",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+880-1715-409109",
      contactType: "Customer Service",
    },
  };
}
