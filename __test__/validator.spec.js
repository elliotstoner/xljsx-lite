import validator from '../src/validator';
import {
  MISSING_KEY_FILENAME,
  INVALID_TYPE_SHEET,
  INVALID_TYPE_SHEET_DATA
} from '../src/common/constants';
import baseConfig from './baseConfig';

const baseConfigDescription = expect.objectContaining({
  filename: expect.any(String),
  sheets: expect.arrayContaining([
    expect.objectContaining({
      sheetName: expect.any(String),
      data: expect.arrayContaining([
        expect.arrayContaining([
          expect.objectContaining({
            value: expect.anything(),
            type: expect.anything()
          })
        ])
      ])
    })
  ])
});

console.error = jest.fn();

describe('Validator', () => {
  it('Should ensure being called with correct base config succeeds', () => {
    expect(baseConfig).toEqual(baseConfigDescription);
  });

  it('If multi sheet validation is successfull return true', () => {
    expect(validator(baseConfig)).toBe(true);
  });

  it('If validation fails it should call console.error', () => {
    let config = Object.assign({}, baseConfig, { filename: 1234 });
    validator(config)
    expect(console.error).toBeCalled();
  });

  describe('Filename Validator', () => {
    it('Should be a property of the config', () => {
      let config = Object.assign({}, config);
      delete config.filename;
      expect(validator(config)).toBe(false);
      expect(console.error).toBeCalledWith(MISSING_KEY_FILENAME);
    });
  });

  describe('Sheet data', () => {
    it('Should ensure that sheet data key is an array', () => {
      let config = Object.assign({}, baseConfig, { sheets: [{ data: { test: 'test' } }] });
      expect(validator(config)).toBe(false);
      expect(console.error).toBeCalledWith(INVALID_TYPE_SHEET);
    });

    it('Should ensure each of the childs is an array', () => {
      let config = Object.assign({}, baseConfig, { sheets: [{ data: [{ test: 'demo' }] }] });
      expect(validator(config)).toBe(false);
      expect(console.error).toBeCalledWith(INVALID_TYPE_SHEET_DATA);
    });
  })
});
