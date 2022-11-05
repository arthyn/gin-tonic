import os from 'os';
import path from 'path';
import fsp from 'fs/promises';
import fse from 'fs-extra';
import chalk from "chalk";
import prompts from "prompts";
import { config, Workspace } from "../config.js";
import dir from '../dir.js';

const ask = (workspaces: Workspace[]) => prompts([
  {
    type: 'autocomplete',
    name: 'wksp',
    message: 'Pick a workspace to sync',
    choices: workspaces.map((w, i) => ({
      title: w.name,
      value: w
    }))
  }
]);

export default async function pour(wksp?: string, options?: { force: boolean }) {
  const workspaces = config.get('workspaces', []);

  if (!workspaces || workspaces.length === 0) {
    console.log(chalk.yellow('No workspaces found, add one with "gin add"'));
    return;
  }

  const space = workspaces.find(w => w.name === wksp);

  if (!space) {
    const res = await ask(workspaces);
    return sync(res.wksp, options?.force || false);
  }

  return sync(space, options?.force || false);
}

function resolveHome(filepath: string) {
  if (filepath[0] === '~') {
      return path.join(os.homedir(), filepath.slice(1));
  }
  return filepath;
}

async function sync(wksp: Workspace, force: boolean) {
  const source = resolveHome(path.join(dir, 'tonic'));
  const files = await fsp.readdir(source, {
    withFileTypes: true
  });
  const isDesk = files.some(f => ['desk.bill', 'sys.kelvin', 'desk.docket-0'].includes(f.name));

  if (!isDesk && !force) {
    console.log(chalk.yellow('The desk directory provided does not look like an Urbit desk, aborting. This block can be overridden with -f'));
    return;
  }

  const pier = resolveHome(wksp.pier);
  
  fse.copySync(source, path.join(pier, wksp.desk))
  console.log(chalk.green('copied tonic to desk'));
}