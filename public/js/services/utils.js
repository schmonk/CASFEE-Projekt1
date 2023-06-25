export function toggleValue(targetValue, value1, value2) {
  // eslint-disable-next-line no-param-reassign
  targetValue = targetValue === value1 ? value2 : value1;
  return targetValue;
}

export function clamp(value, lower, upper) {
  let myValue = value;
  if (myValue < lower) {
    myValue = lower;
  } else if (myValue > upper) {
    myValue = upper;
  }
  return myValue;
}

export default { toggleValue, clamp };
