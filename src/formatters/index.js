import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const whichFormat = (objOfDiff, format) => {
  if (format === 'plain') {
    return plain(objOfDiff);
  }
  if (format === 'json') {
    return json(objOfDiff);
  }

  return stylish(objOfDiff);
};

export default whichFormat;
