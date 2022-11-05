import chalk from "chalk";
import { config } from "../config.js";

export default function ls() {
  const workspaces = config.get('workspaces', []);

  if (!workspaces || workspaces.length === 0) {
    console.log(chalk.yellow('No workspaces found, add one with "gin add"'));
    return;
  }
  
  console.table(workspaces);
}