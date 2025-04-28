
export interface NumericFeature {
  name: string;
  values: { [key: string]: number };
}

export interface BooleanFeature {
  name: string;
  values: { [key: string]: boolean };
}

export interface RoomComparison {
  selectedTypes: string[];
  baseSpecs: NumericFeature[];  // For numeric specs like size, bedrooms, etc.
  features: BooleanFeature[];   // For boolean features like "has balcony", etc.
}
