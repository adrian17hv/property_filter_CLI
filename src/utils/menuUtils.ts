import chalk from "chalk";
import { menuOptions } from "./menuOptions";

export function displayMenuOptions() {
  console.log(chalk.green("\nChoose an option to filter by:"));

  Object.entries(menuOptions).forEach(([key, option]) => {
    console.log(`${chalk.cyan(key)}. ${chalk.bold.green(option.title)}`);
  });
}
