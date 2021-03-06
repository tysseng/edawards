import { isRunning } from "../runstatus";
import logger from "./logger";

export const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const abortable = (funcToAsync) => {
  return new Promise((resolve, reject) => setTimeout(() => {
    try{
      const result = funcToAsync();
      if(isRunning()){
        resolve(result);
      } else {
        logger.error('- ABORTED, stop was pressed');
        reject('ABORT');
      }
    } catch (err) {
      reject(err)
    }

  }, 0));
};