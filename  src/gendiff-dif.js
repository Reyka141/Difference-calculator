import * as fs from 'node:fs';

const readingFile = (pathToFile) => {
    const file = fs.readFileSync(pathToFile, 'utf8');
    return JSON.parse(file);
}

const gendiff = (filepath1, filepath2) => {
    const file1 = readingFile(filepath1);
    const file2 = readingFile(filepath2);
    console.log(file2);
}

export default gendiff;
