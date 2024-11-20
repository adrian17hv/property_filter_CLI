import { QuestionType } from "../types";
import inquirer from "inquirer";

async function handleNumberTypeQuestion(title: string) {
  const { comparator } = await inquirer.prompt([
    {
      type: "list",
      name: "comparator",
      message: `Select the comparison operator for "${title}": `,
      choices: [
        { name: "Greater than ", value: "gt" },
        { name: "Equal to ", value: "eq" },
        { name: "Less than ", value: "lt" }
      ],
    },
  ]);

  const { value } = await inquirer.prompt([
    {
      type: "number",
      name: "value",
      message: `Please provide a value to filter ${title}:`,
      validate: (input) =>
       (input && !isNaN(input)) ? true : "Please enter a valid number.",
    },
  ]);

  return { comparator, value };
}

async function handleTextTypeQuestion(title: string) {
  const { value } = await inquirer.prompt([
    {
      type: "input",
      name: "value",
      message: `Enter the value for ${title}:`,
    },
  ]);

  return { comparator: "includes", value };
}

async function handleGroupTypeQuestion(title: string) {
  const { value } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "value",
      message: `Select the ${title} values:`,
      choices: ["pool", "garage", "yard"],
      validate: (selected) =>
        selected.length > 0 ? true : "You must select at least one option.",
    },
  ]);

  return { comparator: "includesGroup", value };
}


async function handleLocationTypeQuestion() {
  const { latitude } = await inquirer.prompt([
    {
      type: "number",
      name: "latitude",
      message: "Introduce latitude (example: 40.730610):",
      validate: (input) =>
        (input && !isNaN(input)) ? true : "Please enter a valid number for latitude.",
    },
  ]);

  const { longitude } = await inquirer.prompt([
    {
      type: "number",
      name: "longitude",
      message: "Introduce longitude (example: -73.935242):",
      validate: (input) =>
        (input && !isNaN(input)) ? true : "Please enter a valid number for longitude.",
    },
  ]);

  return { value: [latitude, longitude] };
}

const questionByType = {
  number: handleNumberTypeQuestion,
  text: handleTextTypeQuestion,
  group: handleGroupTypeQuestion,
  distance: handleLocationTypeQuestion,
};

export function runQuestionByType(title: string, type: QuestionType) {
  const questionFunction = questionByType[type];
  if (!questionFunction) {
    throw new Error(`Unsupported question type: ${type}`);
  }
  return questionFunction(title);
}
