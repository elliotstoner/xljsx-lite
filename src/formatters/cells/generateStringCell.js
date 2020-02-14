import escape from 'lodash.escape';
import generateCellNumber from '../../common/generateCellNumber';

export default (index, value, rowIndex) => (`<c r="${generateCellNumber(index, rowIndex)}" t="inlineStr"><is><t>${escape(value)}</t></is></c>`);
