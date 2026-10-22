/**
 * Maps student data to PDF form fields or coordinates
 * IMPORTANT: Adjust these X,Y coordinates based on your actual PDF template
 * The coordinate system origin (0,0) is at the bottom-left corner of the page
 * Y increases upward from the bottom
 *
 * To find exact coordinates in your PDF:
 * 1. Open st-id.pdf in Adobe Acrobat Pro → Tools → Edit PDF
 * 2. Or use Preview on Mac → Tools → Show Inspector → Mouse shows coordinates
 * 3. Or use trial and error - generate PDF and adjust until positions are correct
 */

// Standard ID card dimensions (in points - 1 point = 1/72 inch)
// Credit card size: 85.6mm × 53.98mm = 243pt × 153pt
// Letter size: 612pt × 792pt

const ID_CARD_DIMENSIONS = {
  width: 243, // Credit card width in points
  height: 153, // Credit card height in points
};

export const ID_CARD_FIELDS = {
  // Page 1 (Front) - Adjust these coordinates based on your PDF template
  FRONT: {
    STUDENT_PHOTO: {
      page: 0,
      x: 54,
      y: 118,
      width: 45,
      height: 45,
    },
    STUDENT_NAME: {
      page: 0,
      textAlign: 'center',
      x: 0,
      y: 102,
      fontSize: 11,
      maxWidth: 170,
    },
    ID_NUMBER: {
      page: 0,
      textAlign: 'center',
      x: 0,
      y: 9,
      fontSize: 6.38,
      fontWeight: 'bold',
    },
    COURSE: {
      page: 0,
      x: 71,
      y: 83,
      fontSize: 7,
    },
    BATCH: {
      page: 0,
      x: 71,
      y: 68,
      fontSize: 7,
    },
    DURATION: {
      page: 0,
      x: 71,
      y: 54,
      fontSize: 7,
    },
  },
  // Page 2 (Back) - QR code and additional information
  BACK: {
    QR_CODE: {
      page: 1,
      x: 16,
      y: 37,
      width: 25,
      height: 25,
    },
    VERIFICATION_TEXT: {
      page: 1,
      x: 50,
      y: 60,
      fontSize: 10,
      maxWidth: 200,
    },
    SCAN_ME: {
      page: 1,
      x: 100,
      y: 185,
      fontSize: 12,
    },
  },
};

/**
 * Map student data to field values for PDF population
 * @param {Object} student - Student document from MongoDB
 * @returns {Object} - Mapped field values
 */
export function mapStudentDataToFields(student) {
  return {
    name: student.studentName || '',
    idNumber: student.idNumber || '',
    course: student.course || '',
    batch: student.batchNumber || '',
    duration: student.duration || '',
    photoUrl: student.studentImage || null,
  };
}

/**
 * Get field configuration by name
 * @param {string} fieldName - Name of the field (e.g., 'STUDENT_NAME', 'QR_CODE')
 * @param {boolean} isBackPage - Whether to get back page fields
 * @returns {Object|null} - Field configuration or null if not found
 */
export function getFieldConfig(fieldName, isBackPage = false) {
  const section = isBackPage ? ID_CARD_FIELDS.BACK : ID_CARD_FIELDS.FRONT;
  return section[fieldName] || null;
}

/**
 * Adjust coordinates for different PDF page sizes
 * @param {Object} config - Field configuration
 * @param {number} originalWidth - Original PDF width in points
 * @param {number} originalHeight - Original PDF height in points
 * @param {number} targetWidth - Target PDF width in points
 * @param {number} targetHeight - Target PDF height in points
 * @returns {Object} - Adjusted configuration
 */
export function adjustCoordinates(
  config,
  originalWidth,
  originalHeight,
  targetWidth,
  targetHeight
) {
  const xScale = targetWidth / originalWidth;
  const yScale = targetHeight / originalHeight;

  const adjusted = { ...config };

  if (config.x !== undefined) {
    adjusted.x = config.x * xScale;
  }
  if (config.y !== undefined) {
    adjusted.y = config.y * yScale;
  }
  if (config.width !== undefined) {
    adjusted.width = config.width * xScale;
  }
  if (config.height !== undefined) {
    adjusted.height = config.height * yScale;
  }

  return adjusted;
}
