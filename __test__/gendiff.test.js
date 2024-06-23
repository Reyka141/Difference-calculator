// @ts-check

import genDiff from '../index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let pathToFile1;
let pathToFile2;
const diffResult1 = ['  - follow: false',
                    '    host: hexlet.io',
                    '  - proxy: 123.234.53.22',
                    '  - timeout: 50',
                    '  + timeout: 20',
                    '  + verbose: true'];
beforeAll(() => {
    pathToFile1 = getFixturePath('file1.json');
    pathToFile2 = getFixturePath('file2.json');
  });

// test('test function readingFile', () => {
//     console.log(getFixturePath('file1.json'));
//     expect(readingFile(getFixturePath('file1.json'))).toEqual(JSON.parse(file1));
// });

test('test genDiff to work', () => {
    expect(genDiff(pathToFile1, pathToFile2))
    .toBe([
        '{',
        ...diffResult1,
        `}`,
      ].join('\n'));
});

