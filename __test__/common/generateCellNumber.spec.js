import generateCellNumber from '../../src/common/generateCellNumber';

describe('Cell number generate', () => {
  it('should create cell number A1', () => {
    expect(generateCellNumber(0, 1)).toBe('A1');
  });

  it('should create cell number AD3', () => {
    expect(generateCellNumber(29, 3)).toBe('AD3');
  });

  it('should create cell number BAR7', () => {
    expect(generateCellNumber(1395, 7)).toBe('BAR7');
  });

  it('should create cell number FOOBAR44', () => {
    expect(generateCellNumber(78407931, 44)).toBe('FOOBAR44');
  });
});
