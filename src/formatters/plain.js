import _ from 'lodash';

const addQuotesToSring = (value) => (_.isString(value) ? `'${value}'` : value);

const formatValue = (value) => (_.isObject(value) ? '[complex value]' : addQuotesToSring(value));

const plain = (objOfDiff) => {
  const iter = (objValue, objKey = '') => {
    const entries = Object.entries(objValue);

    const result = entries.reduce((acc, currentKey, index, arr) => {
      const [key, value] = currentKey;
      const transformKey = key.startsWith('+ ') || key.startsWith('- ') ? key.slice(2) : key;

      const forComparisonAfter = `+ ${transformKey}`;
      const forComparisonBefore = `- ${transformKey}`;

      const [secondKey, secondValue] = arr[index + 1] ?? [undefined, undefined];
      const [previousKey] = arr[index - 1] ?? [undefined, undefined];

      const pathToKey = (objKey.length === 0) ? transformKey : objKey.concat('.', transformKey);

      if (key.startsWith('+ ') && previousKey !== forComparisonBefore) {
        return [...acc, `Property '${pathToKey}' was added with value: ${formatValue(value)}`];
      }
      if (key.startsWith('- ') && secondKey === forComparisonAfter) {
        return [...acc, `Property '${pathToKey}' was updated. From ${formatValue(value)} to ${formatValue(secondValue)}`];
      }
      if (key.startsWith('- ')) {
        return [...acc, `Property '${pathToKey}' was removed`];
      }
      if (_.isObject(value)) {
        return [...acc, ...iter(value, pathToKey)];
      }
      return acc;
    }, []);
    return result;
  };

  return iter(objOfDiff).join('\n');
};

export default plain;
