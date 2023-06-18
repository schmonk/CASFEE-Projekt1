const localStorageTasksKey = 'myTasks';
const localStorageSortingKey = 'mySorting';

function storeSorting(sortingType, ascendingState) {
  const mySorting = {
    mySortingType: sortingType,
    myAscendingState: ascendingState,
  };
  const parsedSorting = JSON.stringify(mySorting);
  localStorage.setItem(localStorageSortingKey, parsedSorting);
}

function storeTasks(tasks) {
  const parsedTasks = JSON.stringify(tasks);
  localStorage.setItem(localStorageTasksKey, parsedTasks);
}

function retrieveTasks() {
  const retrievedTasks = localStorage.getItem(localStorageTasksKey.toString());
  const parsedTasks = JSON.parse(retrievedTasks);
  return parsedTasks;
}

export default {
  storeTasks,
  retrieveTasks,
  storeSorting,
};
