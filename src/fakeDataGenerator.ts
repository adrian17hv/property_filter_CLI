import { Property } from "./types";
import { faker } from "@faker-js/faker";

faker.seed(111); // to generate the same property every time i will use the 111 seed parameter that will ensure a deterministic output

const generatePropertyDescription = () => {
  const type = faker.helpers.arrayElement([
    "apartment",
    "house",
    "condo",
    "townhouse",
  ]);
  const location = `${faker.location.city()}, ${faker.location.state()}`;
  const features = [
    faker.helpers.arrayElement([
      "spacious kitchen",
      "large backyard",
      "modern design",
    ]),
    faker.helpers.arrayElement([
      "beautiful garden",
      "ample storage space",
      "open floor plan",
    ]),
    faker.helpers.arrayElement([
      "high ceilings",
      "natural lighting",
      "hardwood floors",
    ]),
  ];

  return `This ${type} in ${location}. It features ${features.join(", ")}.`;
};

export const generateProperty = (id: number): Property => {
  return {
    id,
    name: faker.location.street() + " " + faker.location.buildingNumber(),
    squareFootage: faker.number.int({ min: 800, max: 3000 }),
    lighting: faker.helpers.arrayElement(["low", "medium", "high"]),
    price: faker.number.int({ min: 150000, max: 1000000 }),
    rooms: faker.number.int({ min: 1, max: 6 }),
    bathrooms: faker.number.int({ min: 1, max: 5 }),
    location: [faker.location.latitude(), faker.location.longitude()],
    description: generatePropertyDescription(),
    amenities: {
      yard: faker.datatype.boolean(),
      garage: faker.datatype.boolean(),
      pool: faker.datatype.boolean(),
    },
  };
};

export const properties: Property[] = Array.from({ length: 20 }, (_, id) =>
  generateProperty(id + 1)
);