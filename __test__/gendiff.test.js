// @ts-check

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let pathToFile1;
let pathToFile2;
let pathToFile3;
let pathToFile4;
let resultPlainFromat;
let resultStylishFromat;
beforeAll(() => {
  pathToFile1 = getFixturePath('file1.json');
  pathToFile2 = getFixturePath('file2.json');
  pathToFile3 = getFixturePath('file1.yml');
  pathToFile4 = getFixturePath('file2.yml');
  resultPlainFromat = readFile('result_plain.txt');
  resultStylishFromat = readFile('result_stylish.txt');
});

// test('test function readingFile', () => {
//     console.log(getFixturePath('file1.json'));
//     expect(readingFile(getFixturePath('file1.json'))).toEqual(JSON.parse(file1));
// });

test('test genDiff to work with stylish format', () => {
  expect(genDiff(pathToFile1, pathToFile2)).toBe(resultStylishFromat);

  expect(genDiff(pathToFile3, pathToFile4)).toBe(resultStylishFromat);

  expect(genDiff(pathToFile2, 'invalidformat')).toBe('error of type file');
});

test('test genDiff to work with plain format', () => {
  expect(genDiff(pathToFile1, pathToFile2, 'plain')).toBe(resultPlainFromat);

  expect(genDiff(pathToFile4, pathToFile4, 'plain')).toBe(resultPlainFromat);

  expect(genDiff(pathToFile2, 'invalidformat', 'plain')).toBe('error of type file');
});

// test('test genDiff to work with json format', () => {
//   expect(genDiff(pathToFile1, pathToFile2, 'json')).toEqual(resultJsonFormat);

//   expect(genDiff(pathToFile2, 'invalidformat', 'json')).toBe('error of type file');
// });
