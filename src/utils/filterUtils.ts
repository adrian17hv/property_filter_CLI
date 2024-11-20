import { properties } from "../fakeDataGenerator";
import getDistance from "./getDistance";
import { FilterManager } from "./filterManager";
import { Comparator, Location, QuestionType } from "../types";
import { runQuestionByType } from "./runQuestionByType";
import chalk from "chalk";
import inquirer from "inquirer";
import { menuOptions } from "./menuOptions";

export const validComparators: Comparator[] = [
  "gt",
  "lt",
  "eq",
  "includes",
  "includesGroup",
  "distance",
];

export function mapPropertyWithDistance(value: Location) {
  return properties.map((prop) => ({
    ...prop,
    distance: getDistance(value, prop.location),
  }));
}

export const createFilter = async (): Promise<FilterManager> => {
  let filterManager;
  console.log(chalk.green("\nChoose an option to filter by:"));
  const menuChoices = Object.entries(menuOptions).map(([key, option]) => ({
    name: `${chalk.cyan(key)}. ${chalk.bold.green(option.title)}`,
    value: key,
  }));

  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Please, select one of the above options:",
      choices: menuChoices,
    },
  ]);

  const selectedOption = menuOptions[choice as keyof typeof menuOptions];

  if (selectedOption) {
    const { key, title, type } = selectedOption;
    const { comparator, value } = await runQuestionByType(title, type as QuestionType);

    if (!comparator) {
      filterManager = new FilterManager(mapPropertyWithDistance(value));
      return filterManager;
    }

    filterManager = new FilterManager();

    if (!validComparators.includes(comparator as Comparator)) {
      console.log(chalk.red("Invalid comparator. Restarting filter creation."));
      return createFilter();
    }

    filterManager.addFilter(key, comparator as Comparator, value);
  } else {
    console.log(chalk.red("Invalid option. Please try again."));
    return createFilter();
  }

  return filterManager;
};
