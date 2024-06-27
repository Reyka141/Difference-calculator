// @ts-check

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const pathToFile1 = getFixturePath('file1.json');
const pathToFile2 = getFixturePath('file2.json');
const pathToFile3 = getFixturePath('file1.yml');
const pathToFile4 = getFixturePath('file2.yaml');
const pathToInvalidFile = getFixturePath('result_json.txt');
const resultPlainFromat = readFile('result_plain.txt');
const resultStylishFromat = readFile('result_stylish.txt');
const resultJsonFormat = readFile('result_json.txt');

test('work with stylish format', () => {
  const genDiffForTest = () => genDiff(pathToFile2, 'invalidformat.txt', 'stylish');
  expect(genDiff(pathToFile1, pathToFile2, 'stylish')).toBe(resultStylishFromat);

  expect(genDiff(pathToFile3, pathToFile4, 'stylish')).toBe(resultStylishFromat);

  expect(genDiffForTest).toThrow('Error path: invalidformat.txt is not exist');
});

test('to work with plain format', () => {
  expect(genDiff(pathToFile1, pathToFile2, 'plain')).toBe(resultPlainFromat);

  expect(genDiff(pathToFile3, pathToFile4, 'plain')).toBe(resultPlainFromat);
});

test('genDiff test json format', () => {
  expect(genDiff(pathToFile1, pathToFile2, 'json')).toEqual(resultJsonFormat);
});

test('run test -f invalid', () => {
  const genDiffForTestFormat = () => genDiff(pathToFile1, pathToFile2, 'yml');
  expect(genDiffForTestFormat).toThrow("Unknown format: 'yml'!");
});

test('work invalid format file', () => {
  const genDiffForTestFormatFile = () => genDiff(pathToFile1, pathToInvalidFile);
  expect(genDiffForTestFormatFile).toThrow("Unknown extname: '.txt'!");
});
