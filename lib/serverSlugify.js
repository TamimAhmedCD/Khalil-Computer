import { slugify } from "./slugify";
import { ObjectId } from "mongodb";

/**
 * Generate a unique slug for a MongoDB collection
 * SERVER-SIDE ONLY (requires MongoDB)
 *
 * @param {string} text - The text to convert to slug
 * @param {Function} collectionFn - Async function that returns the MongoDB collection
 * @param {string} [excludeId] - Optional ID to exclude from uniqueness check (for updates)
 * @returns {Promise<string>} - Unique slug
 */
export async function generateUniqueSlug(text, collectionFn, excludeId = null) {
  let slug = slugify(text);

  if (!slug) {
    slug = "untitled";
  }

  const col = await collectionFn();
  let counter = 0;
  let uniqueSlug = slug;

  while (true) {
    const query = { slug: uniqueSlug };

    // Exclude current document when updating
    if (excludeId) {
      // Safely handle ObjectId conversion if valid format
      if (ObjectId.isValid(excludeId)) {
        query._id = { $ne: new ObjectId(excludeId) };
      } else {
        query._id = { $ne: excludeId };
      }
    }

    const existing = await col.findOne(query);

    if (!existing) {
      return uniqueSlug;
    }

    counter++;
    uniqueSlug = `${slug}-${counter}`;
  }
}
