import chalk from 'chalk';
import prompts from 'prompts';
import { config } from '../config.js';

export default async function add() {
  const res = await prompts([
    {
      type: 'text',
      name: 'name',
      message: 'a shorthand name for referring to this workspace'
    },
    {
      type: 'text',
      name: 'pier',
      message: 'the directory of the urbit ship we\'re working with'
    },
    {
      type: 'text',
      name: 'source',
      message: 'the directory which holds the source files that will be synced to the desk'
    },
    {
      type: 'text',
      name: 'desk',
      message: 'the name of the desk to sync to'
    }
  ]);

  const workspaces = config.get('workspaces', []);
  config.set('workspaces', [...workspaces, res]);
  console.log(chalk.green(`${res.name} workspace added, run "gin watch ${res.name}" to sync`));
}