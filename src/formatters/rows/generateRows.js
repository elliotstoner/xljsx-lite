import map from 'lodash.map';
import formatRow from './formatRow';

export default rows => map(rows, (row, index) => formatRow(row, index)).join('');
