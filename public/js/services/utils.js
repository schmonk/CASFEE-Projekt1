export function sortTasks(property = "creationDate", ascendingState = true) {
  const sortedArray = tm.tasksSorted(`${property}`, ascendingState);
  renderTasks(sortedArray);
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

export default { sortTasks, clamp };
