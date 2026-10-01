import { createHash } from 'crypto';
import axios from 'axios';

/**
 * Extract public_id from Cloudinary URL
 */
export function extractPublicId(url) {
  if (!url || !url.includes('cloudinary')) return null;

  try {
    // URL format examples:
    // 1. https://res.cloudinary.com/[cloud_name]/image/upload/[transformations]/[version]/[public_id].[format]
    // 2. https://res.cloudinary.com/[cloud_name]/image/upload/v1234567890/[public_id].[format]
    // 3. https://res.cloudinary.com/[cloud_name]/image/upload/f_auto,q_auto,w_500/v1234567890/[public_id].[format]

    const parts = url.split('/upload/');
    if (parts.length < 2) return null;

    // Get everything after /upload/
    let pathAfterUpload = parts[1];

    // Remove the upload folder prefix (khalilcomputer/students/)
    // Cloudinary public_id should include the full folder path
    // We want to keep the full path: "khalilcomputer/students/abc123"

    // Split by '/' to get all segments
    const segments = pathAfterUpload.split('/');

    // Find the version segment (starts with 'v' followed by numbers)
    let publicIdSegments = [];
    let foundVersion = false;

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];

      // Skip transformation segments (e.g., "f_auto,q_auto,w_500")
      if (segment.includes('_')) {
        continue;
      }

      // If we find a version segment (v1234567890), all subsequent segments are part of public_id
      if (segment.startsWith('v') && /^v\d+$/.test(segment)) {
        foundVersion = true;
        continue;
      }

      // If we found version, collect all remaining segments
      if (foundVersion) {
        publicIdSegments.push(segment);
      } else {
        // Before version, check if this is a valid public_id segment
        // It could be the upload folder structure
        publicIdSegments.push(segment);
      }
    }

    // Join all segments with '/' to get the full public_id
    let publicId = publicIdSegments.join('/');

    // Remove file extension
    publicId = publicId.substring(0, publicId.lastIndexOf('.'));

    return publicId;
  } catch (error) {
    console.error('Error extracting public_id:', error);
    return null;
  }
}

/**
 * Generate Cloudinary signature for API requests
 */
function generateSignature(params) {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');

  const toSign = sortedParams + process.env.CLOUDINARY_API_SECRET;
  return createHash('sha1').update(toSign).digest('hex');
}

/**
 * Delete image from Cloudinary using direct API call (to avoid SDK timestamp issues)
 */
export async function deleteFromCloudinary(imageUrl) {
  if (!imageUrl || !imageUrl.includes('cloudinary')) {
    console.log('Cloudinary delete: Invalid URL or not Cloudinary URL');
    return { success: false, error: 'Invalid URL' };
  }

  console.log('Cloudinary delete: Extracting public_id from:', imageUrl);
  const publicId = extractPublicId(imageUrl);
  console.log('Cloudinary delete: Extracted public_id:', publicId);

  if (!publicId) {
    console.log('Cloudinary delete: Could not extract public_id');
    return { success: false, error: 'Could not extract public_id' };
  }

  try {
    console.log('Cloudinary delete: Deleting public_id:', publicId);

    // Debug environment variables
    console.log('Environment variables check:', {
      api_key_exists: !!process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      cloud_name_exists: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_secret_exists: !!process.env.CLOUDINARY_API_SECRET,
    });

    // Use Cloudinary API directly with manual timestamp to avoid sync issues
    const timestamp = Math.floor(Date.now() / 1000);

    // Parameters for signature (don't include api_key in signature)
    const paramsToSign = {
      public_id: publicId,
      timestamp: timestamp,
    };

    // Generate signature
    const signature = generateSignature(paramsToSign);

    // Parameters for API request (include api_key but not in signature)
    const params = {
      api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      public_id: publicId,
      timestamp: timestamp,
      signature: signature,
    };

    // Make DELETE request to Cloudinary API
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
      params,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    console.log('Cloudinary delete response:', response.data);
    return { success: true, result: response.data };
  } catch (error) {
    console.error('Cloudinary delete error:', error.response?.data || error.message);
    return { success: false, error: error.message };
  }
}
