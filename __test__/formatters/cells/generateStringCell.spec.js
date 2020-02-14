import generateStringCell from '../../../src/formatters/cells/generateStringCell';

const expectedXML = '<c r="A1" t="inlineStr"><is><t>Test</t></is></c>';

describe('Cell of type String', () => {
  it('Should create a new xml markup cell', () => {
    expect(generateStringCell(0, 'Test', 1)).toBe(expectedXML);
  });
});
