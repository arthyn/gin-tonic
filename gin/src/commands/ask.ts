import prompts from "prompts";
import commands, { Command } from "./manifest.js";

const cmds = () => prompts([
  {
    type: 'autocomplete',
    name: 'cmd',
    message: 'Choose an action:',
    choices: Object.values(commands).map((c, i) => ({
      title: c.key,
      value: c.key,
      description: c.desc
    }))
  }
]);

export default async function ask() {
  const resp = await cmds();

  return commands[resp.cmd as Command].action();
}