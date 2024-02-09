export const calculateGrowth = (firstValue: number, lastValue: number) => {
  let growth = (lastValue / firstValue - 1) * 100;
  let formatter = Intl.NumberFormat("en", {
    notation: "compact",
    signDisplay: "always",
  });
  return formatter.format(growth);
};

export const calculateVolume = (value: number) => {
  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(value);
};
