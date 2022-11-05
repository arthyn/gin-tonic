import chalk from "chalk";
import prompts from "prompts";
import { config, Workspace } from "../config.js";

const ask = (workspaces: Workspace[]) => prompts([
  {
    type: 'autocomplete',
    name: 'wksp',
    message: 'Pick a workspace to remove',
    choices: workspaces.map((w, i) => ({
      title: w.name,
      value: w
    }))
  }
]);

export default async function remove(wksp?: string) {
  const workspaces = config.get('workspaces', []);

  if (!workspaces || workspaces.length === 0) {
    console.log(chalk.yellow('No workspaces found'));
    return;
  }

  const space = workspaces.find(w => w.name === wksp);

  if (!space) {
    const res = await ask(workspaces);
    return delWksp(res.wksp.name, workspaces);
  }

  return delWksp(space.name, workspaces);
}

function delWksp(wksp: string, workspaces: Workspace[]) {
  config.set('workspaces', workspaces.filter(w => w.name !== wksp));
}