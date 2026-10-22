/**
 * Multi-Provider AI Helper with Fallback Chaining
 * Supports multiple free AI providers stored in MongoDB
 * System admin can add unlimited API keys
 */

import { collection } from "@/lib/mongodb";

// Free AI Models Database
const freeAiModels = [
  {
    id: "google-gemini-2-flash",
    provider: "Google Gemini",
    model: "gemini-2.0-flash-exp",
    type: "gemini",
    apiKeyEnv: "GEMINI_API_KEY",
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent",
    priority: 1,
    freeTier: true,
  },
  {
    id: "google-gemini-2-flash-thinking",
    provider: "Google Gemini",
    model: "gemini-2.0-flash-thinking-exp:120b",
    type: "gemini",
    apiKeyEnv: "GEMINI_API_KEY",
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-thinking-exp:120b:generateContent",
    priority: 2,
    freeTier: true,
  },
  {
    id: "openai-gpt-4o-mini",
    provider: "OpenAI",
    model: "gpt-4o-mini",
    type: "openai",
    apiKeyEnv: "OPENAI_API_KEY",
    endpoint: "https://api.openai.com/v1/chat/completions",
    priority: 3,
    freeTier: false,
  },
  {
    id: "openrouter-google-gemini-free",
    provider: "OpenRouter",
    model: "google/gemini-2.0-flash-exp:free",
    type: "openrouter",
    apiKeyEnv: "OPENROUTER_API_KEY",
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    priority: 4,
    freeTier: true,
  },
  {
    id: "openrouter-meta-llama-free",
    provider: "OpenRouter",
    model: "meta-llama/llama-3-2-1b-instruct:free",
    type: "openrouter",
    apiKeyEnv: "OPENROUTER_API_KEY",
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    priority: 5,
    freeTier: true,
  },
  {
    id: "openrouter-mistral-free",
    provider: "OpenRouter",
    model: "mistralai/mistral-7b-instruct:free",
    type: "openrouter",
    apiKeyEnv: "OPENROUTER_API_KEY",
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    priority: 6,
    freeTier: true,
  },
];

// ==============================
// Free AI Provider Clients
// ==============================

async function callGemini(freeAiProvider, prompt, systemMessage = "") {
  if (!freeAiProvider) return null;

  try {
    const apiKey = freeAiProvider.apiKey || process.env[freeAiProvider.apiKeyEnv];
    if (!apiKey) return null;

    const fullPrompt = systemMessage ? `${systemMessage}\n\n${prompt}` : prompt;

    const response = await fetch(
      `${freeAiProvider.endpoint}?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
          generationConfig: {
            maxOutputTokens: 1024,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini Error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (error) {
    console.error(`${freeAiProvider.provider} API error:`, error.message);
    return null;
  }
}

async function callOpenRouter(freeAiProvider, prompt, systemMessage = null) {
  if (!freeAiProvider) return null;

  try {
    const apiKey = freeAiProvider.apiKey || process.env[freeAiProvider.apiKeyEnv];
    if (!apiKey) return null;

    const messages = [];
    if (systemMessage) {
      messages.push({ role: "system", content: systemMessage });
    }
    messages.push({ role: "user", content: prompt });

    const response = await fetch(freeAiProvider.endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://khalil-computer.com",
        "X-Title": "Khalil Computer Blog Admin",
      },
      body: JSON.stringify({
        model: freeAiProvider.model,
        messages: messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter Error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content;
  } catch (error) {
    console.error(`${freeAiProvider.provider} API error:`, error.message);
    return null;
  }
}

async function callOpenAI(freeAiProvider, prompt, systemMessage = null) {
  if (!freeAiProvider) return null;

  try {
    const apiKey = freeAiProvider.apiKey || process.env[freeAiProvider.apiKeyEnv];
    if (!apiKey) return null;

    const messages = [];
    if (systemMessage) {
      messages.push({ role: "system", content: systemMessage });
    }
    messages.push({ role: "user", content: prompt });

    const response = await fetch(freeAiProvider.endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: freeAiProvider.model,
        max_tokens: 1024,
        temperature: 0.7,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI Error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content;
  } catch (error) {
    console.error(`${freeAiProvider.provider} API error:`, error.message);
    return null;
  }
}

// ==============================
// AI Helper Functions
// ==============================

async function callFreeAiProvider(freeAiProvider, prompt, systemMessage = null, parseAsJSON = false) {
  if (!freeAiProvider) return null;

  console.log(`AI: Trying ${freeAiProvider.provider} (${freeAiProvider.model})...`);

  let result = null;

  if (freeAiProvider.type === "gemini") {
    result = await callGemini(freeAiProvider, prompt, systemMessage);
  } else if (freeAiProvider.type === "openrouter") {
    result = await callOpenRouter(freeAiProvider, prompt, systemMessage);
  } else if (freeAiProvider.type === "openai") {
    result = await callOpenAI(freeAiProvider, prompt, systemMessage);
  }

  if (result) {
    console.log(`✓ AI: Success with ${freeAiProvider.provider}`);
    return { data: result, provider: freeAiProvider.provider };
  }

  return null;
}

/**
 * Get free AI providers from database (sorted by priority)
 */
async function getFreeAiProviders() {
  try {
    const db = await collection("aiProviders");
    const providers = await db.find({}).toArray();

    // If no providers in DB, return default free models
    if (providers.length === 0) {
      console.log("AI: No providers found in database, using default free models");
      return freeAiModels.filter(p => p.freeTier);
    }

    console.log(`AI: Loaded ${providers.length} providers from database`);
    return providers;
  } catch (error) {
    console.error("AI: Failed to load providers from database:", error.message);
    return freeAiModels.filter(p => p.freeTier);
  }
}

/**
 * Execute prompt across all available providers with fallback
 */
async function executeWithFallback(prompt, systemMessage = null, parseAsJSON = false) {
  const providers = await getFreeAiProviders();

  for (const provider of providers) {
    const result = await callFreeAiProvider(provider, prompt, systemMessage, parseAsJSON);

    if (result) {
      if (parseAsJSON) {
        try {
          const jsonMatch = result.data.match(/[\{\[][\s\S]*[\}\]]/);
          if (jsonMatch) {
            result.data = JSON.parse(jsonMatch[0]);
          }
        } catch (error) {
          console.error(`AI: Failed to parse JSON from ${provider.provider}:`, error);
        }
      }

      return result;
    }
  }

  console.log("⚠️ AI: All providers failed, using offline fallback");
  return { data: null, provider: "Offline Fallback", isFallback: true };
}

// ==============================
// Public API Functions
// ==============================

/**
 * Generate SEO metadata for a blog post
 */
export async function generateSEOMetadata(title, content, category) {
  const plainText = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  const prompt = `As an SEO expert for a computer training institute in Bangladesh, analyze this blog:

Title: ${title}
Category: ${category}
Content: ${plainText.substring(0, 1500)}...

Generate SEO metadata:
1. Meta Title (50-60 chars, compelling, includes main keyword)
2. Meta Description (150-160 chars, action-oriented)
3. Focus Keywords (3-5 keywords)
4. Suggested Tags (5-7 tags related to computer education)

Return ONLY valid JSON:
{
  "metaTitle": "Optimized Title Here",
  "metaDescription": "Description here...",
  "keywords": ["keyword1", "keyword2"],
  "suggestedTags": ["tag1", "tag2"]
}`;

  const systemMessage = "You are an expert SEO consultant specializing in educational technology and computer training. Provide concise, effective SEO recommendations.";

  const result = await executeWithFallback(prompt, systemMessage, true);

  if (result.isFallback || !result.data) {
    return generateLocalSEO(title, category);
  }

  return result.data;
}

/**
 * Generate blog excerpt
 */
export async function generateExcerpt(content, maxLength = 150) {
  const plainText = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  const prompt = `Create a compelling excerpt (${maxLength} characters maximum) from this blog content. Make it engaging and make readers want to read the full article. Do not include quotes around the excerpt:

${plainText.substring(0, 800)}

Return ONLY the excerpt text, nothing else.`;

  const systemMessage = "You are a professional content writer who creates engaging excerpts that capture attention and encourage readers to continue reading.";

  const result = await executeWithFallback(prompt, systemMessage, false);

  if (result.isFallback || !result.data) {
    const text = plainText.length > maxLength ? plainText.substring(0, maxLength) + "..." : plainText;
    return text;
  }

  return result.data.trim().replace(/^["']|["']$/g, '');
}

/**
 * Get content improvement suggestions
 */
export async function getContentSuggestions(content, tone = "professional") {
  const plainText = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  const prompt = `Analyze this blog content for a ${tone} tone and provide improvement suggestions:

${plainText.substring(0, 1500)}

Provide:
1. Readability score (1-10)
2. 3-5 specific improvement suggestions
3. Keyword density analysis (good, low, or high)
4. Heading structure recommendations (well-structured or needs-improvement)

Return ONLY valid JSON:
{
  "readabilityScore": 7,
  "suggestions": ["suggestion1", "suggestion2"],
  "keywordDensity": "good",
  "headingStructure": "well-structured"
}`;

  const systemMessage = "You are a professional content editor who provides constructive, actionable feedback to improve writing quality.";

  const result = await executeWithFallback(prompt, systemMessage, true);

  if (result.isFallback || !result.data) {
    return generateLocalSuggestions();
  }

  return result.data;
}

/**
 * Generate image alt text
 */
export async function generateImageAlt(imageContext) {
  const prompt = `Generate a descriptive, SEO-friendly alt text (maximum 125 characters) for a blog cover image based on this context:

${imageContext}

Return ONLY the alt text string, nothing else. No quotes.`;

  const systemMessage = "You are an accessibility and SEO expert who creates descriptive image alt text that helps visually impaired users and improves search engine rankings.";

  const result = await executeWithFallback(prompt, systemMessage, false);

  if (result.isFallback || !result.data) {
    return `Blog cover image: ${imageContext.substring(0, 50).replace(/\n/g, " ")}...`;
  }

  return result.data.trim().replace(/^["']|["']$/g, '');
}

/**
 * Suggest related blog topics
 */
export async function suggestRelatedTopics(title, category, tags) {
  const prompt = `Based on this blog post context, suggest 5 related topics for future blog posts.

Title: ${title}
Category: ${category}
Tags: ${tags?.join(", ") || "none"}

Return ONLY a valid JSON array of strings:
["Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5"]`;

  const systemMessage = "You are a content strategist who identifies trending topics and suggests relevant, engaging subjects for future blog posts.";

  const result = await executeWithFallback(prompt, systemMessage, true);

  if (result.isFallback || !result.data) {
    return [
      `More about ${title.split(" ")[0] || "this topic"}`,
      `${category || "Computer"} basics and tips`,
      "Advanced guide for " + (category || "this subject"),
      "Common mistakes in " + (category || "this subject"),
      "Future trends in " + (category || "this subject")
    ];
  }

  if (!Array.isArray(result.data) && result.data.topics) {
    return result.data.topics;
  }

  return Array.isArray(result.data) ? result.data : [];
}

// ==============================
// Full Blog Generation Functions
// ==============================

/**
 * Generate a complete blog post from a topic
 */
export async function generateFullBlog(topic, keywords, blogType, tone, category) {
  const keywordList = keywords ? keywords.split(",").map(k => k.trim()).filter(Boolean) : [];

  const prompt = `You are a professional content writer for a computer training institute in Bangladesh. Create a COMPLETE blog post about:

Topic: ${topic}
Keywords: ${keywordList.join(", ") || "computer, technology"}
Blog Type: ${blogType}
Tone: ${tone}
Category: ${category}

Create a comprehensive blog post with:
1. Engaging title (both Bangla and English mixed if appropriate)
2. Full detailed content (minimum 800 words) with proper HTML formatting:
   - Use <h2> for main sections
   - Use <h3> for subsections
   - Use <p> for paragraphs
   - Use <ul> and <li> for bullet points
   - Use <strong> and <em> for emphasis
   - Include practical examples
   - Add actionable tips
3. SEO-optimized meta information
4. Compelling excerpt

Return ONLY valid JSON:
{
  "title": "Blog Title Here",
  "slug": "blog-title-here",
  "content": "<h2>Section 1</h2><p>Content here...</p>",
  "excerpt": "Compelling summary...",
  "coverImageAlt": "Descriptive alt text",
  "seo": {
    "metaTitle": "SEO Title",
    "metaDescription": "SEO Description"
  },
  "keywords": ["keyword1", "keyword2"],
  "suggestedTags": ["tag1", "tag2"]
}`;

  const systemMessage = `You are an expert content writer who creates high-quality, SEO-optimized blog posts for computer education. Write in a ${tone} tone. For Bangladeshi audience, mix Bangla and English naturally where appropriate.`;

  const result = await executeWithFallback(prompt, systemMessage, true);

  if (result.isFallback || !result.data) {
    return generateLocalFullBlog(topic, blogType, category);
  }

  return result.data;
}

/**
 * Generate multiple title options
 */
/**
 * Generate a single optimized title from a prompt
 * This version has improved instructions for better results
 */
export async function generateTitleFromPrompt(promptText, blogType = "tutorial") {
  const prompt = `You are an expert content strategist and SEO specialist for a computer training institute in Bangladesh. Create an exceptional blog title based on this topic description.

Topic Description: ${promptText}
Blog Type: ${blogType}

INSTRUCTIONS:
1. Create a SINGLE, highly engaging blog title
2. Make it SEO-optimized with relevant keywords
3. Keep it under 70 characters for best SEO results
4. Use numbers when applicable (e.g., "5 টি সহজ উপায়")
5. Include power words that drive clicks
6. Make it clear what the reader will learn
7. Mix Bangla and English naturally for Bangladeshi audience
8. Use proper capitalization (first letter of major words capitalized)
9. Avoid clickbait - be honest about content
10. Make it curiosity-driven but descriptive

Return ONLY the title text, nothing else. No quotes, no explanations.`;

  const systemMessage = "You are an expert content strategist who creates viral-worthy, SEO-optimized blog titles that drive traffic and engagement.";

  const result = await executeWithFallback(prompt, systemMessage, false);

  if (result.isFallback || !result.data) {
    return `কীভাবে ${promptText} শিখবেন - সম্পূর্ণ গাইড`;
  }

  // Clean up the title
  let title = result.data.trim();
  // Remove quotes if present
  title = title.replace(/^["']|["']$/g, "");
  // Ensure it's not too long
  if (title.length > 100) {
    title = title.substring(0, 97) + "...";
  }
  return title;
}

/**
 * Generate multiple title options
 */
export async function generateTitles(topic, blogType) {
  const prompt = `You are an expert content strategist for a computer training institute in Bangladesh. Generate 5 catchy, SEO-friendly blog titles for:

Topic: ${topic}
Type: ${blogType}

INSTRUCTIONS:
1. Each title should be unique and compelling
2. Use Bangla-English mix naturally for local audience
3. Include numbers where appropriate (e.g., "৫ টি টিপস")
4. Make titles under 70 characters
5. Use action words and power words
6. Create curiosity without clickbait
7. SEO-optimized with keywords

Return ONLY a JSON array of exactly 5 titles:
["Title 1", "Title 2", "Title 3", "Title 4", "Title 5"]`;

  const systemMessage = "You are an expert at creating compelling blog titles that drive clicks and search engine rankings.";

  const result = await executeWithFallback(prompt, systemMessage, true);

  if (result.isFallback || !result.data) {
    return [
      `${topic} - সম্পূর্ণ গাইড`,
      `${topic}: শুরু করার সহজ উপায়`,
      `${topic} সম্পর্কে যা জানা দরকার`,
      `${topic} - টিপস এবং ট্রিকস`,
      `কীভাবে ${topic} শিখবেন`,
    ];
  }

  return Array.isArray(result.data) ? result.data : result.data.titles || [];
}

/**
 * Generate blog outline
 */
export async function generateOutline(topic, blogType, tone) {
  const prompt = `Create a detailed blog outline for:

Topic: ${topic}
Type: ${blogType}
Tone: ${tone}

Generate 6-8 main sections with brief descriptions. Return ONLY a JSON array of section titles:
["Introduction", "Section 1 Title", "Section 2 Title", ..., "Conclusion"]`;

  const systemMessage = "You are an expert at structuring educational content for maximum clarity and engagement.";

  const result = await executeWithFallback(prompt, systemMessage, true);

  if (result.isFallback || !result.data) {
    return [
      "ভূমিকা",
      `${topic} কী?`,
      "মূল বৈশিষ্ট্য",
      "ব্যবহারিক উদাহরণ",
      "টিপস এবং সেরা অভ্যাস",
      "সাধারণ ভুল",
      "উপসংহার",
    ];
  }

  return Array.isArray(result.data) ? result.data : result.data.outline || [];
}

// ==============================
// Local Fallback for Full Blog
// ==============================

function generateLocalFullBlog(topic, blogType, category) {
  const title = `${topic} - সম্পূর্ণ গাইড`;
  const slug = topic.toLowerCase()
    .replace(/[ঀ-৿]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");

  const content = `
<h2>ভূমিকা</h2>
<p>${topic} সম্পর্কে বিস্তারিত জানুন। এই ব্লগ পোস্টে আমরা ${topic} এর সকল গুরুত্বপূর্ণ দিক নিয়ে আলোচনা করব।</p>

<h2>${topic} কী?</h2>
<p>${topic} হল একটি গুরুত্বপূর্ণ বিষয় যা ${category} ক্ষেত্রে ব্যবহৃত হয়। এটি শেখা এবং বুঝা অত্যন্ত গুরুত্বপূর্ণ।</p>

<h2>মূল বৈশিষ্ট্য</h2>
<ul>
  <li>সহজ এবং কার্যকর</li>
  <li>ব্যবহারিক প্রয়োগ</li>
  <li>দ্রুত শেখা যায়</li>
</ul>

<h2>ব্যবহারিক উদাহরণ</h2>
<p>এখানে কিছু ব্যবহারিক উদাহরণ দেওয়া হল যা আপনাকে ${topic} বুঝতে সাহায্য করবে।</p>

<h2>টিপস এবং সেরা অভ্যাস</h2>
<ul>
  <li>নিয়মিত অনুশীলন করুন</li>
  <li>প্রাক্টিক্যাল প্রজেক্ট করুন</li>
  <li>অনলাইন রিসোর্স ব্যবহার করুন</li>
</ul>

<h2>উপসংহার</h2>
<p>${topic} শেখা একটি ধারাবাহিক প্রক্রিয়া। নিয়মিত অনুশীলনের মাধ্যমে আপনি দক্ষতা অর্জন করতে পারবেন।</p>
  `.trim();

  return {
    title,
    slug,
    content,
    excerpt: `${topic} সম্পর্কে বিস্তারিত জানুন। সম্পূর্ণ গাইড এবং টিপস সহ।`,
    coverImageAlt: `${topic} - Computer Training`,
    seo: {
      metaTitle: `${title} | Khalil Computer`,
      metaDescription: `${topic} সম্পর্কে সম্পূর্ণ গাইড। শিখুন সহজ উপায়ে।`,
    },
    keywords: [topic, category, "computer", "training"],
    suggestedTags: [category, "tutorial", "guide"],
  };
}

// ==============================
// Local Fallback Functions
// ==============================

function generateLocalSEO(title, category) {
  const keywords = title
    ?.toLowerCase()
    .replace(/[^\w\sঀ-৿]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .slice(0, 3) || ["computer", "education", "training"];

  return {
    metaTitle: `${title ? title.substring(0, 45) : "Blog Post"} | Khalil Computer`,
    metaDescription: `Read about ${title || "our latest post"}. ${category || "Computer"} blog with tips and tutorials.`,
    keywords: keywords.length > 0 ? keywords : ["computer", "education", "training"],
    suggestedTags: [category || "General", "tutorial", "guide", "blog", "news"],
  };
}

function generateLocalSuggestions() {
  return {
    readabilityScore: 7,
    suggestions: [
      "Add more subheadings for better structure",
      "Include bullet points for key information",
      "Add practical examples where possible",
      "Keep paragraphs short (3-4 sentences each)",
      "Add relevant images with descriptive alt text",
    ],
    keywordDensity: "neutral",
    headingStructure: "needs-analysis",
  };
}

/**
 * Get list of configured AI providers from database
 */
export async function getAvailableProviders() {
  const providers = await getFreeAiProviders();
  return providers.map(p => ({
    id: p._id?.toString() || p.id,
    provider: p.provider,
    model: p.model,
    type: p.type,
    enabled: true,
    freeTier: p.freeTier || false,
    priority: p.priority || 99,
  }));
}

/**
 * Generate SEO-friendly slug from title using AI
 * Creates optimized, short, keyword-rich slugs
 */
export async function generateSeoSlug(title) {
  const prompt = `You are an expert SEO specialist and URL optimization consultant. Create the BEST possible SEO-friendly URL slug from this blog title.

Title: "${title}"

CRITICAL SEO SLUG RULES:
1. **English Only**: Convert all Bangla/Bengali words to their English equivalents or phonetic spellings
2. **Keyword-Rich**: Include the most important keywords that users would search for
3. **Short & Memorable**: Maximum 5-6 words (40-60 characters total)
4. **Search Intent**: Match what users type in Google search
5. **Lowercase**: Use only lowercase letters
6. **Hyphens**: Separate words with hyphens (-), never underscores
7. **No Stop Words**: Remove "a", "an", "the", "and", "or", "but", "in", "on", "at" unless critical
8. **Numbers**: Keep numbers as digits (5, 10, not five, ten)
9. **Brand Names**: Keep brand names intact (Excel, HTML, CSS, Windows, etc.)
10. **Action Words**: Use verbs when applicable (learn, create, build, master)

CONVERSION EXAMPLES:
- "কম্পিউটার প্রোগ্রামিং শেখার ৫ টি সহজ উপায়" → "5-ways-learn-computer-programming"
- "HTML CSS দিয়ে Website তৈরি করুন" → "create-website-html-css"
- "Microsoft Excel টিপস এবং ট্রিকস" → "microsoft-excel-tips-tricks"
- "ওয়েব ডিজাইন শিখুন ২০২৪" → "learn-web-design-2024"
- "Python প্রোগ্রামিং বাংলা টিউটোরিয়াল" → "python-programming-bangla-tutorial"
- "ফ্রিল্যান্সিং শুরু করার গাইড" → "freelancing-beginners-guide"

SEO OPTIMIZATION TIPS:
✓ Focus on main topic keywords
✓ Make it click-worthy and descriptive
✓ Think about what users search on Google
✓ Avoid generic words like "post", "blog", "article"
✓ Keep it natural and readable

Return ONLY the optimized slug. No quotes, no explanations, no extra text.`;

  const systemMessage = "You are a world-class SEO expert specializing in URL optimization, keyword research, and search engine ranking. You understand both English and Bangla content and create slugs that maximize search visibility and click-through rates.";

  const result = await executeWithFallback(prompt, systemMessage, false);

  if (result.isFallback || !result.data) {
    // Fallback: basic English slug (remove Bangla for SEO)
    return title.toLowerCase()
      .replace(/[ঀ-৿]/g, "") // Remove Bangla for international SEO
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "") || "blog-post";
  }

  // Clean up the AI-generated slug
  let slug = result.data.trim()
    .toLowerCase()
    .replace(/^["']|["']$/g, "") // Remove quotes
    .replace(/[ঀ-৿]/g, "") // Remove any Bangla that slipped through
    .replace(/[^\w\-]+/g, "") // Remove special chars
    .replace(/\-\-+/g, "-") // Replace multiple hyphens
    .replace(/^-+/, "") // Remove leading hyphens
    .replace(/-+$/, ""); // Remove trailing hyphens

  return slug || "blog-post";
}

// Export helper
export const isAIEnabled = true; // AI is enabled if we have any provider configured
