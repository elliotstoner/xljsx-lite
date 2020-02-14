import generateNumberCell from '../../../src/formatters/cells/generateNumberCell';

export const expectedXML = '<c r="A1"><v>1000</v></c>';

describe('Cell of type Number', () => {
  it('Should create a new xml markup cell', () => {
    expect(generateNumberCell(0, 1000, 1)).toBe(expectedXML);
  });
});
