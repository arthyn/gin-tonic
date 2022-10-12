import os from 'os';
import path from 'path';
import fse from 'fs-extra';
import chalk from "chalk";
import prompts from "prompts";
import { config, Workspace } from "../config.js";

const __dirname = path.resolve(process.env.TONIC || '')

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

export default async function pour(wksp?: string) {
  const workspaces = config.get('workspaces', []);

  if (!workspaces || workspaces.length === 0) {
    console.log(chalk.yellow('No workspaces found, add one with "gin add"'));
    return;
  }

  const space = workspaces.find(w => w.name === wksp);

  if (!space) {
    const res = await ask(workspaces);
    return sync(res.wksp);
  }

  return sync(space);
}

function resolveHome(filepath: string) {
  if (filepath[0] === '~') {
      return path.join(os.homedir(), filepath.slice(1));
  }
  return filepath;
}

async function sync(wksp: Workspace) {
  const source = resolveHome(path.join(__dirname, 'tonic'));
  const pier = resolveHome(wksp.pier);
  
  fse.copySync(source, path.join(pier, wksp.desk))
  console.log(chalk.green('copied tonic to desk'));
}