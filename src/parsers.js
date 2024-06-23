import yaml from "js-yaml";
import fs from 'node:fs';
import path from 'path';

const readingFile = (pathToFile) => {
   
    if (path.extname(pathToFile) === '.json') {
        const file = fs.readFileSync(pathToFile, 'utf8');
        return JSON.parse(file);
    } else if (path.extname(pathToFile) === '.yml' || path.extname(pathToFile) === '.yaml') {
        const file = fs.readFileSync(pathToFile, 'utf8');
        return yaml.load(file);
    }
    return undefined;
}

export default readingFile;