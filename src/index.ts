import { properties } from "./fakeDataGenerator";
import { createFilter } from "./utils/filterUtils";
import { displayProperty } from "./utils/displayProperty";

async function main() {
  const filterManager = await createFilter();
  const filteredProperties = filterManager.applyFilters(properties);

  displayProperty(filteredProperties);
}

main();