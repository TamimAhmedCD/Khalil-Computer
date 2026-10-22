import sharp from 'sharp';

/**
 * Create a circular mask SVG for use with sharp (perfect circle)
 */
const createCircularMask = (size = 400) => `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="circleClip">
        <circle cx="${size/2}" cy="${size/2}" r="${size/2}" />
      </clipPath>
    </defs>
    <rect width="${size}" height="${size}" fill="white" clip-path="url(#circleClip)" />
  </svg>
`;

/**
 * Crop an image to a perfect circular shape
 * @param {string} imageUrl - URL or path to the input image
 * @returns {Promise<Buffer>} - Circular cropped image as PNG Buffer
 */
export async function cropToCircular(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    const maskSize = 400; // Larger size for better quality
    const circularMask = createCircularMask(maskSize);

    // Get image metadata to maintain aspect ratio
    const metadata = await sharp(inputBuffer).metadata();

    // Resize to square while cropping to show full head including hair
    // Use a larger square to include more of the head
    const squareSize = Math.min(metadata.width, metadata.height);
    const left = Math.floor((metadata.width - squareSize) / 2); // Center horizontally
    const top = Math.floor(metadata.height * 0.05); // Start from 5% down to include hair

    // Crop to square (head-focused), then resize, then apply circular mask
    const circularBuffer = await sharp(inputBuffer)
      .extract({
        left: left,
        top: top,
        width: squareSize,
        height: squareSize
      })
      .resize(maskSize, maskSize, {
        fit: 'cover',
        position: 'entropy', // Smart crop that focuses on important areas
      })
      .png({
        compressionLevel: 9,
      })
      .composite([
        {
          input: Buffer.from(circularMask),
          blend: 'dest-in',
        },
      ])
      .png()
      .toBuffer();

    return circularBuffer;
  } catch (error) {
    console.error('Error cropping image to circle:', error);

    // Fallback: try simpler approach if the above fails
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const inputBuffer = Buffer.from(arrayBuffer);

      const maskSize = 400;
      const circularMask = createCircularMask(maskSize);

      return await sharp(inputBuffer)
        .resize(maskSize, maskSize, {
          fit: 'cover',
          position: 'face', // Focus on face area
        })
        .png({
          compressionLevel: 9,
        })
        .composite([
          {
            input: Buffer.from(circularMask),
            blend: 'dest-in',
          },
        ])
        .png()
        .toBuffer();
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
      throw fallbackError;
    }
  }
}
