export const statusFilter = [
  { id: 0, text: "All", value: { min: 0, max: 100 } },
  { id: 1, text: "Regular", value: { min: 0, max: 60 } },
  { id: 2, text: "Peaked", value: { min: 60, max: 80 } },
  { id: 3, text: "Exploding", value: { min: 80, max: 100 } },
];

export const timelineFilter = [
  { id: 0, text: "3 Months" },
  { id: 1, text: "6 Months" },
  { id: 2, text: "1 Year" },
  { id: 3, text: "2 Years" },
  { id: 4, text: "5 Years" },
  // { id: 5, text: "1 Year Forecast" },
];

export const categoriesFilter = [
  { id: 0, text: "Default" },
  { id: 1, text: "Growing" },
  { id: 2, text: "Trend Line" },
  { id: 3, text: "Volume" },
];
