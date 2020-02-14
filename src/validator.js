import {
  MISSING_KEY_FILENAME,
  INVALID_TYPE_FILENAME,
  INVALID_TYPE_SHEET,
  INVALID_TYPE_SHEET_DATA,
  INVALID_TYPE_SHEET_NAME,
  MISSING_SHEET_PROPERTY,
} from './common/constants';

const childValidator = array => array.every(item => Array.isArray(item));

export default config => {
  let valid = true;

  if (!config.filename) {
    console.error(MISSING_KEY_FILENAME);
    return false;
  }

  if (typeof config.filename !== 'string') {
    console.error(INVALID_TYPE_FILENAME);
    valid = false;
  }

  if (!config.sheets) {
    console.error(MISSING_SHEET_PROPERTY);
    return false;
  }

  if (config.sheets.length === 0) {
    console.error(INVALID_TYPE_SHEET);
    valid = false;
  }

  for (let i = 0; i < config.sheets.length; i += 1) {
    if (config.sheets[i].filename && typeof config.sheets[i].filename !== 'string') {
      console.error(INVALID_TYPE_SHEET_NAME);
      valid = false;
    }

    if (!Array.isArray(config.sheets[i].data)) {
      console.error(INVALID_TYPE_SHEET);
      valid = false;
    } else if (!childValidator(config.sheets[i].data)) {
      console.error(INVALID_TYPE_SHEET_DATA);
      valid = false;
    }
  }

  return valid;
};
