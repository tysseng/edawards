// 'image', 'video'
import { flipDetectionMethods } from "./processing/flipDetectionMethods";

const source = 'video';
//const source = 'image';

const videoFrameSize = {
  width: 1024,
  height: 1024,
};

// size of image used as input if source = image
const imageSize = {
  width: 1024,
  height: 1365,
};

const sheetSizeA4 = {
  width: 210,
  height: 297,
};

const sheetSizeA3 = {
  width: 297,
  height: 410,
};

const sheetSizeMM = sheetSizeA3;

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
const bitPositionYMM = sheetSizeMM.height - 18;
const bitPositionsMM = [
  { x: sheetSizeMM.width - 88, y: bitPositionYMM },
  { x: sheetSizeMM.width - 70, y: bitPositionYMM },
  { x: sheetSizeMM.width - 54, y: bitPositionYMM },
  { x: sheetSizeMM.width - 36, y: bitPositionYMM },
  { x: sheetSizeMM.width - 19, y: bitPositionYMM },
];

const bitPositions = bitPositionsMM.map(
  pos => ({
    x: Math.floor(pos.x * sheetPPMM),
    y: Math.floor(pos.y * sheetPPMM)
  }));

// color calibration pads position in millimeters
const colorRowsMM = [40, 85, 135, 180, 230, 290];
const colorColsMM = [80, 210];

const colorRows = colorRowsMM.map(pos => Math.floor(pos * sheetPPMM));
const colorCols = colorColsMM.map(pos => Math.floor(pos * sheetPPMM));

const colorPositions = {
  lightBlue: { x: colorCols[0], y: colorRows[0] },
  green: { x: colorCols[0], y: colorRows[1] },
  yellow: { x: colorCols[0], y: colorRows[2] },
  purple: { x: colorCols[0], y: colorRows[3] },
  pink: { x: colorCols[0], y: colorRows[4] },
  white: { x: colorCols[0], y: colorRows[5] },
  orange: { x: colorCols[1], y: colorRows[0] },
  skin: { x: colorCols[1], y: colorRows[1] },
  wine: { x: colorCols[1], y: colorRows[2] },
  darkBlue: { x: colorCols[1], y: colorRows[3] },
  black: { x: colorCols[1], y: colorRows[4] },
};


const sheetSize = {
  width: sheetWidthPixels,
  height: Math.floor(sheetSizeMM.height * sheetPPMM),
};

// Final crop border size - how much to crop away to make sure we don't get a border
const finalCrop = 10;

export default {
  source,

  // while looping - require occlusion of outline before trying to capture new image
  // NB: Hand detection does not work with image, only video.
  detectHand: source === 'video',

  // set this to false to debug with image without bounds
  preventDetectionOutsideBoundingCicle: source === 'video',

  // block processing if detected corners are the same as last time
  preventDuplicates: true,

  // default value for upload after capture checkbox.
  defaultUploadAfterCapture: true,

  // show how long each step takes.
  showTimings: true,

  // Flip correction checks if sheet has been placed upside down. It can use either logo or bitcode
  // to decide if sheet is upside down. If none are chosen, no flip will be done and sheet may end
  // up upside down. Possible options: 'logo', 'bitcode', 'none'.
  flipCorrection: flipDetectionMethods.BITCODE,

  // center of logo to use when removing logo
  removeLogo: false,
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
  removeBitcode: true,
  bitPositions,
  bitPositionPadding: 25,

  // where to find colors to use for calibration
  colorPositions,
  colorBitcode: 30, // TODO - wrong code

  videoSize: {
    width: 1920,
    height: 1080,
  },

  /*
  //4K cam
  videoCircle: { // relative to videoSize
    x: 2950,
    y: 2010,
    radius: 1840,
  },
*/
  //HD cam
  /*
  // Full circle
  videoCircle: { // relative to videoSize
    x: 1470,
    y: 1010,
    radius: 920,
  },
  */

  videoCircle: { // relative to videoSize
    x: 1440,
    y: 980,
    diameter: 870,
  },

  sourceSize: source === 'video' ? videoFrameSize : imageSize,

  sheetSize,

  croppedSize: {
    width: sheetSize.width - 2 * finalCrop,
    height: sheetSize.height - 2 * finalCrop
  },

  filledExpandedSize: {
    width: sheetSize.width + 10,
    height: sheetSize.height + 10
  },

  uploadSize: {
    width: 512,
    height: 512,
  },
  uploadFile: true,
  uploadUrls: [
    'http://169.254.43.21:3000/image',
  ],

  debug: {
    drawSheetCorners: true,
    drawBoundingBox: true,
    drawAllCorners: true,
  },
}

