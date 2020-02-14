import generateCellNumber from '../../common/generateCellNumber';

export default (index, value, rowIndex) => (`<c r="${generateCellNumber(index, rowIndex)}"><v>${value}</v></c>`);
