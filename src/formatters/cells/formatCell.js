import { validTypes, CELL_TYPE_STRING, WARNING_INVALID_TYPE } from '../../common/constants';
import generateStringCell from './generateStringCell';
import generateNumberCell from './generateNumberCell';

export default (cell, index, rowIndex) => {
  return (
    isNaN(cell)
      ? generateStringCell(index, cell, rowIndex)
      : generateNumberCell(index, cell, rowIndex)
  );
};
