import JSZip from 'jszip';
import FileSaver from 'file-saver';
import escape from 'lodash.escape';

const CELL_TYPE_STRING = 'string';
const CELL_TYPE_NUMBER = 'number';
const validTypes = [CELL_TYPE_STRING, CELL_TYPE_NUMBER];

const MISSING_KEY_FILENAME = 'xljsx-lite config missing property filename';
const INVALID_TYPE_FILENAME = 'xljsx-lite filename can only be of type string';
const INVALID_TYPE_SHEET = 'xljsx-lite sheet data is not of type array';
const INVALID_TYPE_SHEET_DATA = 'xljsx-lite sheet data childs is not of type array';
const INVALID_TYPE_SHEET_NAME = 'xljsx-lite sheetName can only be of type string';
const MISSING_SHEET_PROPERTY = 'xljsx-lite config missing property sheets';

const WARNING_INVALID_TYPE = 'Invalid type supplied in cell config, falling back to "string"';

const childValidator = array => array.every(item => Array.isArray(item));

var validator = config => {
  let valid = true;

  if (!config.filename) {
    console.error(MISSING_KEY_FILENAME);
    return false;
  }

  if (typeof config.filename !== 'string') {
    console.error(INVALID_TYPE_FILENAME);
    valid = false;
  }

  if (!config.sheets) {
    console.error(MISSING_SHEET_PROPERTY);
    return false;
  }

  if (config.sheets.length === 0) {
    console.error(INVALID_TYPE_SHEET);
    valid = false;
  }

  for (let i = 0; i < config.sheets.length; i += 1) {
    if (config.sheets[i].filename && typeof config.sheets[i].filename !== 'string') {
      console.error(INVALID_TYPE_SHEET_NAME);
      valid = false;
    }

    if (!Array.isArray(config.sheets[i].data)) {
      console.error(INVALID_TYPE_SHEET);
      valid = false;
    } else if (!childValidator(config.sheets[i].data)) {
      console.error(INVALID_TYPE_SHEET_DATA);
      valid = false;
    }
  }

  return valid;
};

const generateColumnLetter = colIndex => {
  if (typeof colIndex !== 'number') {
    return '';
  }

  const prefix = Math.floor(colIndex / 26);
  const letter = String.fromCharCode(97 + (colIndex % 26)).toUpperCase();
  if (prefix === 0) {
    return letter;
  }
  return generateColumnLetter(prefix - 1) + letter;
};

var generateCellNumber = (index, rowNumber) => (
  `${generateColumnLetter(index)}${rowNumber}`
);

var generateStringCell = (index, value, rowIndex) => (`<c r="${generateCellNumber(index, rowIndex)}" t="inlineStr"><is><t>${escape(value)}</t></is></c>`);

var generateNumberCell = (index, value, rowIndex) => (`<c r="${generateCellNumber(index, rowIndex)}"><v>${value}</v></c>`);

var formatCell = (cell, index, rowIndex) => {
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

var formatRow = (row, index) => {
  // To ensure the row number starts as in excel.
  const rowIndex = index + 1;
  const rowCells = row
    .map((cell, cellIndex) => formatCell(cell, cellIndex, rowIndex))
    .join('');

  return `<row r="${rowIndex}">${rowCells}</row>`;
};

var generateRows = rows => rows
  .map((row, index) => formatRow(row, index))
  .join('');

var workbookXML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mx="http://schemas.microsoft.com/office/mac/excel/2008/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:mv="urn:schemas-microsoft-com:mac:vml" xmlns:x14="http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" xmlns:xm="http://schemas.microsoft.com/office/excel/2006/main"><workbookPr/><sheets>{placeholder}</sheets><definedNames/><calcPr/></workbook>`;

var workbookXMLRels = `<?xml version="1.0" ?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
{placeholder}
</Relationships>`;

var rels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`;

var contentTypes = `<?xml version="1.0" ?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default ContentType="application/xml" Extension="xml"/>
<Default ContentType="application/vnd.openxmlformats-package.relationships+xml" Extension="rels"/>
{placeholder}
<Override ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" PartName="/xl/workbook.xml"/>
</Types>`;

var templateSheet = `<?xml version="1.0" ?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:mv="urn:schemas-microsoft-com:mac:vml" xmlns:mx="http://schemas.microsoft.com/office/mac/excel/2008/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:x14="http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" xmlns:xm="http://schemas.microsoft.com/office/excel/2006/main"><sheetData>{placeholder}</sheetData></worksheet>`;

const generateXMLWorksheet = rows => {
  const XMLRows = generateRows(rows);
  return templateSheet.replace('{placeholder}', XMLRows);
};

const generateWorkbook = config => {
  const zip = new JSZip();
  let contentTypeData = '';
  let workbookXMLData = '';
  let workbookXMLRelData = '';

  for (let i = 0; i < config.sheets.length; i += 1) {
    const id = i + 1;
    zip.file(`xl/worksheets/sheet${id}.xml`, generateXMLWorksheet(config.sheets[i].data));
    contentTypeData += `<Override ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" PartName="/xl/worksheets/sheet${id}.xml"/>`;
    workbookXMLData += `<sheet name="${config.sheets[i].sheetName || `Sheet${id}`}" sheetId="${id}" r:id="rId${id}"/>`;
    workbookXMLRelData += `<Relationship Id="rId${id}" Target="worksheets/sheet${id}.xml" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet"/>`;
  }

  zip.file('xl/workbook.xml', workbookXML.replace('{placeholder}', workbookXMLData));
  zip.file('xl/_rels/workbook.xml.rels', workbookXMLRels.replace('{placeholder}', workbookXMLRelData));
  zip.file('[Content_Types].xml', contentTypes.replace('{placeholder}', contentTypeData));
  zip.file('_rels/.rels', rels);

  return zip;
};

var xljsxLite = config => {
  if (!validator(config)) {
    throw new Error('Validation failed.');
  }

  const zip = generateWorkbook(config);

  return zip.generateAsync({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  }).then(blob => {
    FileSaver.saveAs(blob, `${config.filename}.xlsx`);
  });
};

export default xljsxLite;
export { generateXMLWorksheet };
