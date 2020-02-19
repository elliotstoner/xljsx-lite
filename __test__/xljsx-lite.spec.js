import generateRows from '../src/formatters/rows/generateRows';
import xljsxLite, { generateXMLWorksheet } from '../src/xljsx-lite';
import baseConfig from './baseConfig';

console.error = jest.fn();

describe('xljsxLite', () => {
  const rowsXML = `<row r="1"><c r="A1" t="inlineStr"><is><t>Test</t></is></c><c r="B1"><v>1000</v></c></row>`;

  it('Should throw error if validator fails', () => {
    let config = Object.assign({}, baseConfig, { sheets: [{ data: [{test: 'demo'}] }] });
    expect(() => xljsxLite(config)).toThrow();
  });

  it('Should throw error if multi sheet validator fails', () => {
    let badConfig = Object.assign({}, baseConfig, { sheets: [{ data: [{ test: 'demo' }] }] });
    expect(() => xljsxLite(badConfig)).toThrow();
  });

  it('Should map row arrays to XML markup', () => {
    expect(generateRows(baseConfig.sheets[0].data)).toBe(rowsXML);
  });

  it('Should generate an XML Worksheet from template', () => {
    const expectedXML = [
      '<?xml version="1.0" ?>',
      `<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:mv="urn:schemas-microsoft-com:mac:vml" xmlns:mx="http://schemas.microsoft.com/office/mac/excel/2008/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:x14="http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" xmlns:xm="http://schemas.microsoft.com/office/excel/2006/main"><sheetData>${rowsXML}</sheetData></worksheet>`
    ].join('\n');
    expect(generateXMLWorksheet(baseConfig.sheets[0].data)).toBe(expectedXML);
  });
});
