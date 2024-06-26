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
const arrOfPlainFormat1 = [ 
  "Property 'common.follow' was added with value: false",
  "Property 'common.setting2' was removed",
  "Property 'common.setting3' was updated. From true to null",
  "Property 'common.setting4' was added with value: 'blah blah'",
  "Property 'common.setting5' was added with value: [complex value]",
  "Property 'common.setting6.doge.wow' was updated. From '' to 'so much'",
  "Property 'common.setting6.ops' was added with value: 'vops'",
  "Property 'group1.baz' was updated. From 'bas' to 'bars'",
  "Property 'group1.nest' was updated. From [complex value] to 'str'",
  "Property 'group2' was removed",
  "Property 'group3' was added with value: [complex value]"
];
const arrOfPlainFormat2 = [ 
  "Property 'common.follow' was removed",
  "Property 'common.setting2' was added with value: 200",
  "Property 'common.setting3' was updated. From null to true",
  "Property 'common.setting4' was removed",
  "Property 'common.setting5' was removed",
  "Property 'common.setting6.doge.wow' was updated. From 'so much' to ''",
  "Property 'common.setting6.ops' was removed",
  "Property 'group1.baz' was updated. From 'bars' to 'bas'",
  "Property 'group1.nest' was updated. From 'str' to [complex value]",
  "Property 'group2' was added with value: [complex value]",
  "Property 'group3' was removed"
];
let pathToFile1;
let pathToFile2;
let pathToFile3;
let pathToFile4;
let resultOfDiff1;
let resultOfDiff2;
let resultPlainFromat1;
let resultPlainFromat2;
beforeAll(() => {
    pathToFile1 = getFixturePath('file1.json');
    pathToFile2 = getFixturePath('file2.json');
    pathToFile3 = getFixturePath('file1.yml');
    pathToFile4 = getFixturePath('file2.yml');
    resultOfDiff1 = ['{', ...arrOfDiff1, `}`].join('\n');
    resultOfDiff2 = ['{', ...arrOfDiff2, `}`].join('\n');
    resultPlainFromat1 = arrOfPlainFormat1.join('\n');
    resultPlainFromat2 = arrOfPlainFormat2.join('\n');
  });

// test('test function readingFile', () => {
//     console.log(getFixturePath('file1.json'));
//     expect(readingFile(getFixturePath('file1.json'))).toEqual(JSON.parse(file1));
// });

test('test genDiff to work with stylish format', () => {
    expect(genDiff(pathToFile1, pathToFile2)).toBe(resultOfDiff1);

    expect(genDiff(pathToFile4, pathToFile1)).toBe(resultOfDiff2);

    expect(genDiff(pathToFile2, 'invalidformat')).toBe('error of type file');
});


test('test genDiff to work with plain format', () => {
  expect(genDiff(pathToFile1, pathToFile2, 'plain')).toBe(resultPlainFromat1);

  expect(genDiff(pathToFile4, pathToFile3, 'plain')).toBe(resultPlainFromat2);

  expect(genDiff(pathToFile2, 'invalidformat', 'plain')).toBe('error of type file');
});
