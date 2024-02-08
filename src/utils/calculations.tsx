export const distributedRangeCalculator = (
  min: number,
  max: number,
  steps: number
) => {
  // minimum step size
  let stepsize = (max - min) / steps;
  // increase the step size to a nice boundary
  // for example, 1/10th of the 10^n range that includes it
  let pow = Math.trunc(Math.log10(stepsize)) - 1;
  stepsize = Math.trunc(stepsize / 10 ** pow) * 10 ** pow;
  // round min to the same boundary
  let result = [min];
  min = Math.trunc(min / 10 ** pow) * 10 ** pow;
  for (let i = 0; i < steps - 1; i++) {
    min += stepsize;
    result.push(min);
  }
  result.push(max);
  return result;
};
