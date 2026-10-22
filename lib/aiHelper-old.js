import Anthropic from "@anthropic-ai/sdk";

// Try to initialize Anthropic with API key
const anthropic =
  process.env.ANTHROPIC_API_KEY &&
  process.env.ANTHROPIC_API_KEY !== "your-anthropic-api-key"
    ? new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      })
    : null;

const isAIEnabled = !!anthropic;

/**
 * Generate SEO metadata for a blog post
 * @param {string} title - Blog title
 * @param {string} content - Blog content (HTML)
 * @param {string} category - Blog category
 * @returns {Promise<Object|null>} - Generated SEO data or fallback
 */
export async function generateSEOMetadata(title, content, category) {
  if (!isAIEnabled) {
    return generateFallbackSEO(title, content, category);
  }

  try {
    const plainText = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are an SEO expert for a computer training institute in Bangladesh. Analyze this blog post and generate optimized SEO metadata.

Title: ${title}
Category: ${category}
Content: ${plainText.substring(0, 2000)}...

Generate SEO metadata in both English and Bangla:
1. Meta Title (50-60 characters, compelling, includes main keyword)
2. Meta Description (150-160 characters, action-oriented)
3. Focus Keywords (3-5 keywords)
4. Suggested Tags (5-7 tags related to computer education)

Return ONLY a valid JSON object:
{
  "metaTitle": "English title",
  "metaDescription": "English description",
  "keywords": ["keyword1", "keyword2", ...],
  "suggestedTags": ["tag1", "tag2", ...]
}`,
        },
      ],
    });

    const response = message.content[0].text;
    const jsonMatch = response.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error("AI SEO generation error:", error);
  }

  return generateFallbackSEO(title, content, category);
}

/**
 * Fallback SEO generation without AI
 */
function generateFallbackSEO(title, content, category) {
  // Simple keyword extraction from title
  const keywords = title
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .slice(0, 3);

  return {
    metaTitle: `${title} - ${category || "Computer Blog"}`,
    metaDescription: `Read about ${title}. ${category || "Computer"} blog post with tips and tutorials.`,
    keywords: keywords.length > 0 ? keywords : ["computer", "education", "training"],
    suggestedTags: [category || "General", "tutorial", "guide", "blog", "news"],
  };
}

/**
 * Generate a compelling blog excerpt from content
 * @param {string} content - Blog content (HTML)
 * @param {number} maxLength - Maximum length (default 150)
 * @returns {Promise<string|null>} - Generated excerpt
 */
export async function generateExcerpt(content, maxLength = 150) {
  if (!isAIEnabled) {
    return generateFallbackExcerpt(content, maxLength);
  }

  try {
    const plainText = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: `Create an engaging excerpt (${maxLength} chars max) for this blog:
${plainText.substring(0, 1000)}
Return ONLY the excerpt.`,
        },
      ],
    });

    return message.content[0].text.trim();
  } catch (error) {
    console.error("AI excerpt generation error:", error);
  }

  return generateFallbackExcerpt(content, maxLength);
}

function generateFallbackExcerpt(content, maxLength) {
  const text = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

/**
 * Improve blog content quality
 * @param {string} content - Blog content
 * @param {string} tone - Desired tone
 * @returns {Promise<Object|null>} - Improvement suggestions
 */
export async function getContentSuggestions(content, tone = "professional") {
  if (!isAIEnabled) {
    return generateFallbackSuggestions();
  }

  try {
    const plainText = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: `Analyze blog content for ${tone} tone and suggest improvements:
${plainText.substring(0, 2000)}

Provide readability score, suggestions, and analysis in JSON format.`,
        },
      ],
    });

    const response = message.content[0].text;
    const jsonMatch = response.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error("AI content suggestions error:", error);
  }

  return generateFallbackSuggestions();
}

function generateFallbackSuggestions() {
  return {
    readabilityScore: 7,
    suggestions: [
      "Add more subheadings for better structure",
      "Include bullet points for key information",
      "Add examples where possible",
      "Keep paragraphs short (3-4 sentences)",
    ],
    keywordDensity: "neutral",
    headingStructure: "needs-analysis",
  };
}

/**
 * Generate image alt text from context
 * @param {string} imageContext - Context about the image
 * @returns {Promise<string|null>} - Generated alt text
 */
export async function generateImageAlt(imageContext) {
  if (!isAIEnabled) {
    return "Blog cover image - " + imageContext.substring(0, 50);
  }

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 100,
      messages: [
        {
          role: "user",
          content: `Generate SEO-friendly alt text (max 125 chars) for a blog image:
${imageContext}
Return ONLY the alt text.`,
        },
      ],
    });

    return message.content[0].text.trim();
  } catch (error) {
    console.error("AI alt text generation error:", error);
  }

  return "Blog cover image";
}

/**
 * Suggest related blog topics
 * @param {string} title - Blog title
 * @param {string} category - Blog category
 * @param {Array} tags - Blog tags
 * @returns {Promise<Array>} - Suggested topics
 */
export async function suggestRelatedTopics(title, category, tags) {
  if (!isAIEnabled) {
    return [];
  }

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: `Suggest 5 related blog topics for:
Title: ${title}
Category: ${category}
Tags: ${tags.join(", ")}
Return ONLY a JSON array of topics.`,
        },
      ],
    });

    const response = message.content[0].text;
    const jsonMatch = response.match(/\[[\s\S]*\]/);

    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error("AI topic suggestions error:", error);
  }

  return [];
}

// Export helper
export { isAIEnabled };
