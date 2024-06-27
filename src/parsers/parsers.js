import yaml from 'js-yaml';
import fs from 'node:fs';
import path from 'path';

const getFileName = (file) => fs.readFileSync(path.resolve(file), 'utf8');

const readingFile = (pathToFile) => {
  const extname = path.extname(pathToFile);
  switch (extname) {
    case '.json':
      return JSON.parse(getFileName(pathToFile));
    case '.yml':
      return yaml.load(getFileName(pathToFile));
    case '.yaml':
      return yaml.load(getFileName(pathToFile));
    default:
      return undefined;
  }
};

export default readingFile;
