import os from 'os';
import path from 'path';
import fsp from 'fs/promises';
import fse from 'fs-extra';
import chalk from "chalk";
import prompts from "prompts";
import wch from 'node-watch';
import axios from 'axios';
import sig from 'signale';
import { config, Workspace } from "../config.js";

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

const log = new sig.Signale({ interactive: true, scope: 'gin' })

export default async function watch(wksp?: string, options?: { force: boolean }) {
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
  const source = resolveHome(wksp.source);
  const files = await fsp.readdir(source, {
    withFileTypes: true
  });
  const isDesk = files.some(f => ['desk.bill', 'sys.kelvin', 'desk.docket-0'].includes(f.name));

  if (!isDesk && !force) {
    console.log(chalk.yellow('The desk directory provided does not look like an Urbit desk, aborting. This block can be overridden with -f'));
    return;
  }

  const pier = resolveHome(wksp.pier);
  
  const portPath = path.join(pier, '.http.ports');
  const portFile = (await fsp.readFile(portPath)).toString();
  const loopback = portFile.match(/(\d+).*loopback/);
  
  if (!loopback) {
    console.log(chalk.yellow(`The ship at ${wksp.pier} may not be running, try again after starting it.`));
    return;
  }
  
  const url = `http://localhost:${loopback[1]}`;
  log.await('watching', wksp.name, source);

  wch(source, { recursive: true }, () => {
    log.await('syncing changes');
    fse.copySync(source, path.join(pier, wksp.desk))

    const body = {
      sink: {
        app: 'hood'
      },
      source: {
        dojo: `+hood/commit %${wksp.desk}`
      }
    };

    axios.post(url, body, {
      withCredentials: false
    }).then(() => log.success('synced!'))
  })
}