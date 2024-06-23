// @ts-check

import genDiff from '../index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const arrOfDiff1 = ['  - follow: false',
                    '    host: hexlet.io',
                    '  - proxy: 123.234.53.22',
                    '  - timeout: 50',
                    '  + timeout: 20',
                    '  + verbose: true'];

const arrOfDiff2 = ['  + follow: false',
                    '    host: hexlet.io',
                    '  + proxy: 123.234.53.22',
                    '  - timeout: 20',
                    '  + timeout: 50',
                    '  - verbose: true'];
let pathToFile1;
let pathToFile2;
let pathToFile3;
let pathToFile4;
let resultOfDiff1;
let resultOfDiff2;
beforeAll(() => {
    pathToFile1 = getFixturePath('file1.json');
    pathToFile2 = getFixturePath('file2.json');
    pathToFile3 = getFixturePath('file3.yml');
    pathToFile4 = getFixturePath('file4.yml');
    resultOfDiff1 = ['{', ...arrOfDiff1, `}`].join('\n');
    resultOfDiff2 = ['{', ...arrOfDiff2, `}`].join('\n');
  });

// test('test function readingFile', () => {
//     console.log(getFixturePath('file1.json'));
//     expect(readingFile(getFixturePath('file1.json'))).toEqual(JSON.parse(file1));
// });

test('test genDiff to work with json format', () => {
    expect(genDiff(pathToFile1, pathToFile2)).toBe(resultOfDiff1);

    expect(genDiff(pathToFile2, pathToFile1)).toBe(resultOfDiff2);

    expect(genDiff(pathToFile2, 'invalidformat')).toBe('error of type file');
});

test('test genDiff to work with yml format', () => {
  expect(genDiff(pathToFile3, pathToFile4)).toBe(resultOfDiff1);

  expect(genDiff(pathToFile4, pathToFile3)).toBe(resultOfDiff2);
});

test('test genDiff to work with yml and json format', () => {
  expect(genDiff(pathToFile1, pathToFile4)).toBe(resultOfDiff1);

  expect(genDiff(pathToFile2, pathToFile3)).toBe(resultOfDiff2);
});
