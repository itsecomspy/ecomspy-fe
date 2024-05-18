import React from "react";
import regression from "regression";
import dayjs from "dayjs/esm/index.js";

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
  let volume = formatter.format(value);
  if (volume.slice(-1).toLowerCase() === "k") {
    return volume;
  } else {
    return `${volume}`;
  }
};

export const calculateForecastPoints = (arr?: any[]) => {
  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  const formatData: any[] = [];
  arr?.forEach((a: { volume: string }, key: React.Key) => {
    let newArr = [Number(key) + 1, Number(a.volume)];
    formatData.push(newArr);
  });
  const result = regression.polynomial(formatData, { order: 5 });

  const chartData: any[] = Array(12)
    .fill(null)
    .map((_m: any, k: React.Key) => {
      // set current value and
      const currYear = Number(k) + 1 + month < 12 ? year : year + 1;
      const value = result.points[12 - Number(k) - 1]?.[1];

      return {
        displayDate: `${months[(month + 1 + Number(k)) % 12]} 1, ${currYear}`,
        displayXAxis: currYear,
        formattedTime: `${months[(month + 1 + Number(k)) % 12]} 1, ${currYear}`,
        volume: value < 0 ? 0 : value,
      };
    });

  return chartData;
};
