import QRCode from 'qrcode';

/**
 * Generate QR code as data URL for student ID card
 * @param {string} studentId - Student ID number
 * @returns {Promise<string>} - QR code as data URL
 */
export async function generateStudentQRCode(studentId) {
  try {
    // Generate QR code as data URL (base64 image)
    // Links to verification page
    const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/verify/${studentId}`;

    const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, {
      errorCorrectionLevel: 'H', // High error correction (30% recovery)
      type: 'image/png',
      width: 300, // 300px for print quality
      margin: 1,
    });

    return qrCodeDataUrl;
  } catch (error) {
    console.error('QR Code generation failed:', error);
    throw error;
  }
}
