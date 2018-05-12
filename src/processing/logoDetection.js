import logger from '../utils/logger';
import config from '../config';
import { getAverageColor } from "./jsfeat.utils";

const logoCenter = config.logoDetectionPosition;
const logoSamplePadding = 5;

export const isLogoInCorrectCorner = (image, width, height) => {
  const topLeftColor = getAverageColor(image, width, logoSamplePadding, logoCenter.x, logoCenter.y);
  const bottomRightColor = getAverageColor(image, width, logoSamplePadding, width - logoCenter.x, height - logoCenter.y);

  if(topLeftColor < bottomRightColor) { // logo is black
    logger.info("LOGO: logo is in correct corner");
    return true;
  } else {
    logger.info("LOGO: logo is in wrong corner, rotate sheet!");
    return false;
  }
}