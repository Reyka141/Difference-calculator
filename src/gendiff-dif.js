import _ from 'lodash';
import readingFile from './parsers.js';
import whichFormat from './formatters/index.js';

const creatObjOfDiff = (file1, file2) => {
  const keysFile1 = Object.keys(file1);
  const keysFile2 = Object.keys(file2);

  const keys = _
  .union(keysFile1, keysFile2)
  .sort();

  const objOfDiff = keys.reduce((acc, key) => {
    if (!Object.hasOwn(file1, key)) {
        acc = { ...acc, [`+ ${key}`]: file2[key]};
    } else if (!Object.hasOwn(file2, key)) {
        acc = { ...acc, [`- ${key}`]: file1[key]};
    } else if (_.isObject(file1[key]) && _.isObject(file2[key])) {
        acc = { ...acc, [`  ${key}`]: creatObjOfDiff(file1[key], file2[key])}; 
    } else if (file1[key] !== file2[key]) {
        acc = { ...acc, [`- ${key}`]: file1[key]};
        acc = {... acc, [`+ ${key}`]: file2[key]};
    } else {
        acc = { ...acc, [`  ${key}`]: file1[key]};
    }
   
    return acc;
  }, {});

  return objOfDiff;
}

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = readingFile(filepath1);
  const obj2 = readingFile(filepath2);
  if (obj1 === undefined || obj2 === undefined) {
    return 'error of type file';
  }
    
  const result = creatObjOfDiff(obj1, obj2);
  
  return whichFormat(result, format);
};

export default genDiff;
