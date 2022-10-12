#! /usr/bin/env node

import { program } from 'commander';
import add from './commands/add.js';
import watch from './commands/watch.js';

program.command('add')
  .description('Adds a local Urbit ship and a working directory to the list of available workspaces')
  .action(add);

program.command('watch')
  .argument('[workspace]', 'the workspace to sync')
  .description('Watches a workspace and syncs file changes to the associated Urbit')
  .action(watch);

program.parse();