import yaml from "js-yaml";
import fs from 'node:fs';
import path from 'path';

const readingFile = (pathToFile) => {
   const fullPath = path.resolve(pathToFile)
    if (path.extname(fullPath) === '.json') {
        const file = fs.readFileSync(fullPath, 'utf8');
        return JSON.parse(file);
    } else if (path.extname(fullPath) === '.yml' || path.extname(fullPath) === '.yaml') {
        const file = fs.readFileSync(fullPath, 'utf8');
        return yaml.load(file);
    }
    return undefined;
}


export default readingFile;