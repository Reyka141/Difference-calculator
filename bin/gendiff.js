#!/usr/bin/env node
import { program } from 'commander';
import * as path from 'path';
import gendiff from '../ src/gendiff-dif.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>',)
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const result = gendiff(path.resolve(filepath1),path.resolve(filepath2));
    console.log(result);
  });

program.parse();
