import yaml from 'js-yaml';

const readingFile = (pathToFile, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(pathToFile);
    case '.yml':
      return yaml.load(pathToFile);
    case '.yaml':
      return yaml.load(pathToFile);
    default:
      throw new Error(`Unknown extname: '${format}'!`);
  }
};

export default readingFile;
