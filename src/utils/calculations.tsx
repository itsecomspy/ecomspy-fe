export const calculateGrowth = (firstValue: number, lastValue: number) => {
  let growth = (lastValue / firstValue - 1) * 100;
  let formatter = Intl.NumberFormat("en", {
    maximumSignificantDigits: 2,
    signDisplay: "always",
  });
  return formatter.format(growth || 0);
};

export const calculateVolume = (value: number) => {
  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  let volume = formatter.format(value/10);
  if (volume.slice(-1).toLowerCase() === "k") {
    return volume
  } else {
    return `${volume}`
  }

};
