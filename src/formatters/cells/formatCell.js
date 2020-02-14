import { validTypes, CELL_TYPE_STRING, WARNING_INVALID_TYPE } from '../../common/constants';
import generateStringCell from './generateStringCell';
import generateNumberCell from './generateNumberCell';

export default (cell, index, rowIndex) => {
  if (validTypes.indexOf(cell.type) === -1) {
    console.warn(WARNING_INVALID_TYPE);
    cell.type = CELL_TYPE_STRING;
  }

  return (
    cell.type === CELL_TYPE_STRING
      ? generateStringCell(index, cell.value, rowIndex)
      : generateNumberCell(index, cell.value, rowIndex)
  );
};
