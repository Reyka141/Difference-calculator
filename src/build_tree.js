import _ from 'lodash';

const buildTree = (file1, file2) => {
  const keysFile1 = Object.keys(file1);
  const keysFile2 = Object.keys(file2);

  const keys = _.sortBy(_.union(keysFile1, keysFile2));

  const objOfDiff = keys.reduce((acc, key) => {
    if (!Object.hasOwn(file1, key)) {
      return { ...acc, [`+ ${key}`]: file2[key] };
    } if (!Object.hasOwn(file2, key)) {
      return { ...acc, [`- ${key}`]: file1[key] };
    } if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { ...acc, [`${key}`]: buildTree(file1[key], file2[key]) };
    } if (file1[key] !== file2[key]) {
      return { ...acc, [`- ${key}`]: file1[key], [`+ ${key}`]: file2[key] };
    }

    return { ...acc, [`${key}`]: file1[key] };
  }, {});

  return objOfDiff;
};

export default buildTree;
