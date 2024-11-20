import { properties } from "../fakeDataGenerator";
import { Filter, Comparator, Property } from "../types";
import { comparatorMap } from "./comparator";

export class FilterManager {
  private filters: Map<string, Filter>;
  private properties: Property[]

  constructor(localProperties?:Property[]) {
    this.filters = new Map();
    this.properties = localProperties || properties
  }

  addFilter(key: string, comparator: Comparator, value: number | string | string[]): void {
    const newFilter: Filter = { key, comparator, value };
    this.filters.set(key, newFilter);
  }

  applyFilters(): any[] {
    let filteredData = [...this.properties];

    this.filters.forEach((filter) => {
      const compare = comparatorMap.get(filter.comparator);
      if (compare) {
        filteredData = filteredData.filter((item) => {
          let valueToCompare;
          valueToCompare = item[filter.key];
          return compare(valueToCompare, filter.value);
        });
      }
    });

    return filteredData;
  }

  getFilters(): Filter[] {
    return Array.from(this.filters.values());
  }

  clearFilters(): void {
    this.filters.clear();
  }
}
