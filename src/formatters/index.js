import stylish from './stylish.js';
import plain from './plain.js';

const whichFormat = (objOfDiff, format = 'stylish') => {
  switch (format) {
    case 'plain':
      return plain(objOfDiff);
    case 'stylish':
      return stylish(objOfDiff);
    case 'json':
      return JSON.stringify(objOfDiff);
    default:
      return console.log(`Format not supported ${format}`);
  }
};

export default whichFormat;
