export const comparatorMap: Map<string, (a: any, b: any) => boolean> = new Map([
  ["gt", (a, b) => a > b],
  ["lt", (a, b) => a < b],
  ["eq", (a, b) => a === b],
  ["includes", (a, b) => a.toLowerCase().includes(b.toLowerCase())],
  [
    "includesGroup",
    (record, groupTypes) => {
      return groupTypes.every((group: string) => record[group]);
    },
  ],
]);
