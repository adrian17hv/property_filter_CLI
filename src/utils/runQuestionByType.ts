import { QuestionType } from "../types";
import { question } from "./readLineInterface";

async function handleNumberTypeQuestion(title: string) {
  const comparator = await question(
    "Determine the comparator: gt, eq or lt of " + title + ": "
  );
  const stringValue = await question(
    "Enter the numerical value of " + title + ": "
  );
  const value = parseInt(stringValue, 10);
  return { comparator, value };
}

async function handleTextTypeQuestion(title: string) {
  const value = await question(`Enter the ${title}: `);
  return { comparator: "includes", value };
}

async function handleGroupTypeQuestion(title: string) {
  const values = await question(
    `Enter the ${title} values separated by commas (e.g., pool, garage or yard): `
  );
  const valueArray = values
    .split(",")
    .map((val) => val.trim())
    .filter((val) => val);
  return { comparator: "includesGroup", value: valueArray };
}

async function handleLocationTypeQuestion() {
  const latitudeStr = await question(
    "Introduce latitude (example: 40.730610): "
  );
  const longitudeStr = await question(
    "Introduce longitude (example: -73.935242): "
  );
  const latitude = parseInt(latitudeStr, 10);
  const longitude = parseInt(longitudeStr, 10);

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
  return questionFunction(title);
}
