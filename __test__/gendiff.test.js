// @ts-check

import genDiff from '../index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const arrOfDiff1 = ['    common: {',
                    '      + follow: false',
                    '        setting1: Value 1',
                    '      - setting2: 200',
                    '      - setting3: true',
                    '      + setting3: null',
                    '      + setting4: blah blah',
                    '      + setting5: {',
                    '            key5: value5',
                    '        }',
                    '        setting6: {',
                    '            doge: {',
                    '              - wow: ',
                    '              + wow: so much',
                    '            }',
                    '            key: value',
                    '          + ops: vops',
                    '        }',
                    '    }',
                    '    group1: {',
                    '      - baz: bas',
                    '      + baz: bars',
                    '        foo: bar',
                    '      - nest: {',
                    '            key: value',
                    '        }',
                    '      + nest: str',
                    '    }',
                    '  - group2: {',
                    '        abc: 12345',
                    '        deep: {',
                    '            id: 45',
                    '        }',
                    '    }',
                    '  + group3: {',
                    '        deep: {',
                    '            id: {',
                    '                number: 45',
                    '            }',
                    '        }',
                    '        fee: 100500',
                    '    }'];

const arrOfDiff2 = ['    common: {',
                    '      - follow: false',
                    '        setting1: Value 1',
                    '      + setting2: 200',
                    '      - setting3: null',
                    '      + setting3: true',
                    '      - setting4: blah blah',
                    '      - setting5: {',
                    '            key5: value5',
                    '        }',
                    '        setting6: {',
                    '            doge: {',
                    '              - wow: so much',
                    '              + wow: ',
                    '            }',
                    '            key: value',
                    '          - ops: vops',
                    '        }',
                    '    }',
                    '    group1: {',
                    '      - baz: bars',
                    '      + baz: bas',
                    '        foo: bar',
                    '      - nest: str',
                    '      + nest: {',
                    '            key: value',
                    '        }',

                    '    }',
                    '  + group2: {',
                    '        abc: 12345',
                    '        deep: {',
                    '            id: 45',
                    '        }',
                    '    }',
                    '  - group3: {',
                    '        deep: {',
                    '            id: {',
                    '                number: 45',
                    '            }',
                    '        }',
                    '        fee: 100500',
                    '    }'];
let pathToFile1;
let pathToFile2;
let pathToFile3;
let pathToFile4;
let resultOfDiff1;
let resultOfDiff2;
beforeAll(() => {
    pathToFile1 = getFixturePath('file1.json');
    pathToFile2 = getFixturePath('file2.json');
    pathToFile3 = getFixturePath('file1.yml');
    pathToFile4 = getFixturePath('file2.yml');
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
