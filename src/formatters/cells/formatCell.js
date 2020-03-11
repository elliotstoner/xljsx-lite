import generateStringCell from './generateStringCell';
import generateNumberCell from './generateNumberCell';

export default (cell, index, rowIndex) => (
  isNaN(cell) // eslint-disable-line no-restricted-globals
    ? generateStringCell(index, cell, rowIndex)
    : generateNumberCell(index, cell, rowIndex)
);
