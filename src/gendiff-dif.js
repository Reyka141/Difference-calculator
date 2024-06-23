import _ from 'lodash';
import readingFile from './parsers.js';


const stringify = (value) => {
    const iter = (currentValue, depth) => {
      // альтернативный вариант: (typeof currentValue !== 'object' || currentValue === null)
      if (!_.isObject(currentValue)) {
        return `${currentValue}`;
      }
  
      // const indentSize = depth * spacesCount;
      // const currentIndent = replacer.repeat(indentSize);
      // const bracketIndent = replacer.repeat(indentSize - spacesCount);
      const lines = Object
        .entries(currentValue)
        .map(([key, val]) => `  ${key}: ${iter(val, depth + 1)}`);
      return [
        '{',
        ...lines,
        `}`,
      ].join('\n');
    };
  
    return iter(value, 1);
  };
  


const genDiff = (filepath1, filepath2) => {
    const file1 = readingFile(filepath1);
    const file2 = readingFile(filepath2);
    if (file1 === undefined || file2 === undefined) {
      return 'error of type file';
    }
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
        } else if (file1[key] !== file2[key]) {
            acc = { ...acc, [`- ${key}`]: file1[key]};
            acc = {... acc, [`+ ${key}`]: file2[key]};
        } else {
            acc = { ...acc, [`  ${key}`]: file1[key]};
        }
       
        return acc;
    }, {});
    const stringOfObject = stringify(objOfDiff);


    return stringOfObject;
}

export { readingFile };
export default genDiff;
