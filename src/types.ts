export type QuestionType = "number" | "text" | "group";

export type Comparator = "gt" | "lt" | "eq" | "includes" | "includesGroup" | "distance";

export type Filter = {
  key: string;
  comparator: Comparator;
  value: number | string | string[];
};

export type Location = [number, number];

export type Property = {
  id: number;
  name: string;
  squareFootage: number;
  lighting: "low" | "medium" | "high";
  price: number;
  rooms: number;
  bathrooms: number;
  location: Location;
  description: string;
  amenities: Record<string, boolean>;
};
