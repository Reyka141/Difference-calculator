// @ts-check
import fs from 'node:fs';
import path from 'path';
import readingFile from './parsers/parsers.js';
import whichFormat from './formatters/index.js';
import buildTree from './build_tree.js';

const getFileName = (filepath) => {
  if (fs.existsSync(filepath)) {
    return fs.readFileSync(path.resolve(filepath), 'utf8');
  }
  throw new Error(`Error path: ${filepath} is not exist`);
};

const getExtname = (file) => path.extname(file);

const genDiff = (filepath1, filepath2, format) => {
  const file1 = getFileName(filepath1);
  const file2 = getFileName(filepath2);
  const obj1 = readingFile(file1, getExtname(filepath1));
  const obj2 = readingFile(file2, getExtname(filepath2));

  const result = buildTree(obj1, obj2);

  return whichFormat(result, format);
};

export default genDiff;
