// 'image', 'video'
const source = 'image';

const videoFrameSize = {
  width: 1024,
  height: 1024,
};

// size of image used as input if source = image
const imageSize = {
  width: 1024,
  height: 1365,
};

const sheetSizeMM = {
  width: 210, //A4: 210, A3: 297
  height: 297, //A4: 297, A3:410
};

const sheetWidthPixels = 1024;
const sheetPPMM = sheetWidthPixels / sheetSizeMM.width;

// center of EDawards star
const logoDetectionPositionMM = {
  x: 21.4,
  y: 23.95,
};

// bounding box for removing logo, x,y is top left corner
const logoBoundingBoxMM = {
  x: 9,
  y: 11,
  width: 92,
  height: 24
};

// where to find bit dots (to indicate what image this is)
const bitPositionsMM = [
  { x: sheetSizeMM.width - 20, y: sheetSizeMM.height - 16 },
  { x: sheetSizeMM.width - 30, y: sheetSizeMM.height - 16 },
  { x: sheetSizeMM.width - 40, y: sheetSizeMM.height - 16 },
  { x: sheetSizeMM.width - 50, y: sheetSizeMM.height - 16 },
  { x: sheetSizeMM.width - 60, y: sheetSizeMM.height - 16 },
];

const bitPositions = bitPositionsMM.map(
  pos => ({
    x: Math.floor(pos.x * sheetPPMM),
    y: Math.floor(pos.y * sheetPPMM)
  }));

export default {
  source,
  preventDetectionOutsideBoundingCicle: false, // set this to false to debug with image without bounds
  showSteps: true,
  exactSheetCorrection: true,
  debug: {
    drawSheetCorners: true,
    drawBoundingBox: true,
    drawAllCorners: true,
  },

  videoSize: {
    width: 1920,
    height: 1080,
  },

  videoCircle: { // relative to videoSize
    x: 1415,
    y: 975,
    radius: 895,
  },

  sourceSize: source === 'video' ? videoFrameSize : imageSize,

  sheetSize: {
    width: sheetWidthPixels,
    height: Math.floor(sheetSizeMM.height * sheetPPMM),
  },

  // center of EDawards star
  logoDetectionPosition: {
    x: Math.floor(logoDetectionPositionMM.x * sheetPPMM),
    y: Math.floor(logoDetectionPositionMM.y * sheetPPMM),
  },

  // bounding box for removing logo
  logoBoundingBox: {
    x: Math.floor(logoBoundingBoxMM.x * sheetPPMM),
    y: Math.floor(logoBoundingBoxMM.y * sheetPPMM),
    width: Math.floor(logoBoundingBoxMM.width * sheetPPMM),
    height: Math.floor(logoBoundingBoxMM.height * sheetPPMM),
  },

  // where to find bit dots (to indicate what image this is)
  bitPositions,
  bitPositionPadding: 19,

  imageServer: 'http://localhost:3000/image',
  uploadFile: false,
}

