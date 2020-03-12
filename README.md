xljsx-lite
=======

Generate .xlsx files in the browser using JavaScript with a very small footprint.

This code is based off of code from [egeriis/zipcelx](https://github.com/egeriis/zipcelx), but with the following improvements:
- Allow for multiple sheets without the bloat of trying to maintain backwards compatibility for the `sheet` property.
- When building the config file, you do not need to specific the cell type
- It seems that repo is not maintained, so I hope to continue the project myself!

If you're looking for advanced functionality, [js-xlsx](https://github.com/SheetJS/js-xlsx) is a solid choice.

## Table of contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Examples](https://github.com/elliotstoner/xljsx-lite-examples/)
4. [Contributing](https://github.com/elliotstoner/xljsx-lite/wiki/Contributing)
5. [Issues](#issues)

## Installation

**Install via NPM**

```
npm i xljsx-lite --save
```

**Use standalone**

Download and include `lib/standalone.js` in your project. This will expose a global `xljsxLite` function you can use to create and download spreadsheets.


## Usage

```js
import { xljsxLite } from 'xljsx-lite';

const config = {
  filename: 'example-spreadsheet', // output filename, excluding extension
  sheets: [
    {
      sheetname: 'sheet1',
      data: [
        ['Test', 'Data', 'Row 1'], // Each array in 'data' represents a row
        ['More', 'Data', 'Row 2'],
      ]
    }
  ]
}

// Generate spreadsheet and trigger download
await xljsxLite(config)
```

For more examples, check out the [example repo.](https://github.com/elliotstoner/xljsx-lite-examples/)


## Issues
If you happen to come across a defect, please report them here: [Issue tracker](https://github.com/elliotstoner/xljsx-lite/issues)
1. Search to see if the issue has already been reported, discussed, or explained
2. If you can't find an existing issue, feel free to open one
