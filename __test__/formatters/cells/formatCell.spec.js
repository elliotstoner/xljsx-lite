import formatCell from '../../../src/formatters/cells/formatCell';
import baseConfig from '../../baseConfig';

const cells = baseConfig.sheets[0].data[0];

console.warn = jest.fn();

describe('Format Cell', () => {
  describe('Create a cell of type sting', () => {
    const expectedXML = '<c r="A1" t="inlineStr"><is><t>Test</t></is></c>';

    it('Create cell', () => {
      expect(formatCell("Test", 0, 1)).toBe(expectedXML);
    });
  });

  describe('Create a cell of type number', () => {
    const expectedXML = '<c r="B1"><v>1000</v></c>';
    it('Create cell', () => {
      expect(formatCell(1000, 1, 1)).toBe(expectedXML);
    });
  });
});
