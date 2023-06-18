const localStorageTasksKey = 'myTasks';

/* function clearAndLog(myTasks) {
  console.clear();
  console.table(myTasks);
} */

function storeData(tasks) {
  const parsedTasks = JSON.stringify(tasks);
  localStorage.setItem(localStorageTasksKey, parsedTasks);
}

function retrieveData() {
  const retrievedTasks = localStorage.getItem(localStorageTasksKey.toString());
  const parsedTasks = JSON.parse(retrievedTasks);
  return parsedTasks;
}

export default {
  storeData,
  retrieveData,
};
