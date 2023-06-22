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

function retrieveElement(key) {
  const retrievedElement = localStorage.getItem(key.toString());
  const parsedElement = JSON.parse(retrievedElement);
  return parsedElement;
}

export default {
  storeTasks,
  storeSorting,
  retrieveElement,
};
