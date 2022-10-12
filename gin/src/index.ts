#! /usr/bin/env node

import { program } from 'commander';
import add from './commands/add.js';
import pour from './commands/pour.js';
import watch from './commands/watch.js';

program.command('add')
  .description('Adds a local Urbit ship and a working directory to the list of available workspaces')
  .action(add);

program.command('pour')
  .argument('[workspace]', 'the workspace to copy tonic into')
  .description('Copies the tonic files into your desk')
  .action(pour);

program.command('watch')
  .argument('[workspace]', 'the workspace to sync')
  .description('Watches a workspace and syncs file changes to the associated Urbit')
  .action(watch);

program.parse();