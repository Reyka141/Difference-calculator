import _ from 'lodash';

const formatValue = (value) => _.isObject(value) ? '[complex value]' : addQuotesToSring(value);

const addQuotesToSring = (value) => _.isString(value) ? `'${value}'` : value;


const plain = (objOfDiff) => {
    const iter = (objValue, objKey = '') => {
        const entries = Object.entries(objValue);

        const result = entries.reduce((acc, currentKey, index, arr) => {
            const [key, value] = currentKey;
            const transformKey = key.slice(2);

            const forComparisonAfter = `+ ${transformKey}`;
            const forComparisonBefore = `- ${transformKey}`;

            const [secondKey, secondValue] = arr[index + 1] ?? [undefined, undefined];
            const [previousKey, ] = arr[index - 1] ?? [undefined, undefined]

            const pathToKey = (objKey.length === 0) ? transformKey : objKey.concat('.', transformKey);
            
            if (key.startsWith('+ ') && previousKey !== forComparisonBefore) {
                acc = [ ...acc, `Property '${pathToKey}' was added with value: ${formatValue(value)}`];
            }else if (key.startsWith('- ') && secondKey === forComparisonAfter) {
                acc = [ ...acc, `Property '${pathToKey}' was updated. From ${formatValue(value)} to ${formatValue(secondValue)}`];
            } else if (key.startsWith('- ')) {
                acc = [ ...acc, `Property '${pathToKey}' was removed`];
            } else if (_.isObject(value)) {
                acc = [...acc, ...iter(value, pathToKey)];
            }
            return acc;
        }, []);
        return result;
    }
    
    return iter(objOfDiff).join('\n');
};

export default plain;