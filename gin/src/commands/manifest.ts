import { program } from "commander";
import add from "./add.js";
import ls from "./ls.js";
import pour from "./pour.js";
import remove from "./remove.js";
import watch from "./watch.js";

const commands = {
  add: {
    key: 'add',
    desc: 'Adds a local Urbit ship and a working directory to the list of available workspaces',
    action: add
  },
  help: {
    key: 'help',
    desc: 'Display help information',
    action: () => program.help()
  },
  list: {
    key: 'list',
    desc: 'List available workspaces',
    action: ls
  },
  pour: {
    key: 'pour',
    desc: 'Copies the tonic files into your desk',
    action: pour
  },
  remove: {
    key: 'remove',
    desc: 'Removes the selected workspace',
    action: remove
  },
  watch: {
    key: 'watch',
    desc: 'Watches a workspace and syncs file changes to the associated Urbit',
    action: watch
  }
}

export type Command = keyof typeof commands;

export default commands;