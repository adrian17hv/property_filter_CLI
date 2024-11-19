import chalk from "chalk";

export function displayProperty(filteredProperties: any[]) {
  if (filteredProperties.length > 0) {
    console.log(chalk.green("Found properties:"));
    filteredProperties.forEach((property, index: number) => {
      console.log(
        `${chalk.cyan(index + 1)}. ${chalk.bold("Property name: " + property.name)} - ${chalk.yellow("uSd$ " + property.price)}`
      );
    });
  } else {
    console.log(chalk.red("No properties found for the selected criteria."));
  }
}
