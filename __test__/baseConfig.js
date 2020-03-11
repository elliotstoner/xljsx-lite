/**
  Basic working multi-sheet config
*/

export default {
  filename: 'report',
  sheets: [
    {
      sheetName: 'testSheet',
      data: [
        ['Test', 1000],
      ],
    },
    {
      data: [
        ['Test 2', 2000],
      ],
    },
  ],
};
