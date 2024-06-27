// @ts-check

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const pathToFile1 = getFixturePath('file1.json');
const pathToFile2 = getFixturePath('file2.json');
const pathToFile3 = getFixturePath('file1.yml');
const pathToFile4 = getFixturePath('file2.yaml');
const resultPlainFromat = readFile('result_plain.txt');
const resultStylishFromat = readFile('result_stylish.txt');
const resultJsonFormat = readFile('result_json.txt');

test('work with stylish format', () => {
  expect(genDiff(pathToFile1, pathToFile2)).toBe(resultStylishFromat);

  expect(genDiff(pathToFile3, pathToFile4)).toBe(resultStylishFromat);

  expect(genDiff(pathToFile2, 'invalidformat.txt')).toBe('error of type file');
});

test('to work with plain format', () => {
  expect(genDiff(pathToFile1, pathToFile2, 'plain')).toBe(resultPlainFromat);

  expect(genDiff(pathToFile3, pathToFile4, 'plain')).toBe(resultPlainFromat);

  expect(genDiff(pathToFile2, 'invalidformat.txt', 'plain')).toBe('error of type file');
});

test('genDiff test json format', () => {
  expect(genDiff(pathToFile1, pathToFile2, 'json')).toEqual(resultJsonFormat);

  expect(genDiff(pathToFile2, 'invalidformat.txt', 'json')).toBe('error of type file');
});

test('run test -f invalid', () => {
  expect(genDiff(pathToFile1, pathToFile2, 'yml')).toBe(undefined);
});
