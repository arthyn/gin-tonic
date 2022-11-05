#! /usr/bin/env node

import { program } from 'commander';
import ask from './commands/ask.js';
import commands from './commands/manifest.js';

const {
  add,
  list,
  pour,
  remove,
  watch
} = commands;

program.command(add.key)
  .description(add.desc)
  .action(add.action);

program.command(list.key)
  .description(list.desc)
  .action(list.action);

program.command(pour.key)
  .argument('[workspace]', 'the workspace to copy tonic into')
  .option('-f, --force', 'Forces copy when source doesn\'t look like a desk')
  .description(pour.desc)
  .action(pour.action);

program.command(remove.key)
  .argument('[workspace]', 'the workspace to remove')
  .description(remove.desc)
  .action(remove.action);

program.command(watch.key)
  .argument('[workspace]', 'the workspace to sync')
  .option('-f, --force', 'Forces sync to happen when source doesn\'t look like a desk')
  .description(watch.desc)
  .action(watch.action);

program.command('ask', {
  isDefault: true,
  hidden: true,
}).action(ask);

program.version('0.3.0');

program.parse();