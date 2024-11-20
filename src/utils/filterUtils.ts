import { properties } from "../fakeDataGenerator";
import getDistance from "./getDistance";
import { FilterManager } from "./filterManager";
import { Comparator, Location } from "../types";
import { runQuestionByType } from "./runQuestionByType";
import chalk from "chalk";
import readLineInterface, { question } from "./readLineInterface";
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

export const createFilter = async () => {
  let filterManager;
  console.log(chalk.green("\nChoose an option to filter by:"));

  Object.entries(menuOptions).forEach(([key, option]) => {
    console.log(`${chalk.cyan(key)}. ${chalk.bold.green(option.title)}`);
  });

  const choice = await question(
    "Please, select one of the above options by typing the corresponding number: "
  );

  const selectedOption = menuOptions[choice.trim()];
  if (selectedOption) {
    const { key, title, type } = selectedOption;
    const { comparator, value } = await runQuestionByType(title, type);
    if (!comparator) {
      filterManager = new FilterManager(mapPropertyWithDistance(value as any));
      return filterManager;
    }

    filterManager = new FilterManager();

    if (!validComparators.includes(comparator as Comparator)) {
      return createFilter();
    }

    readLineInterface.close();
    filterManager.addFilter(key, comparator as Comparator, value);
  } else {
    console.log(
      chalk.red("Invalid option. Please try with a correct number option.")
    );
    return createFilter();
  }

  return filterManager;
};
