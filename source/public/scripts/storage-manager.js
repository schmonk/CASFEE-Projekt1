const localStorageKey = 'myTasks';

function storeData(tasks) {
  const parsedTasks = JSON.stringify(tasks);
  localStorage.setItem(localStorageKey, parsedTasks);
}

function retrieveData() {
  const retrievedTasks = localStorage.getItem(localStorageKey.toString());
  const parsedTasks = JSON.parse(retrievedTasks);
  console.table(parsedTasks);
}

export default {
  storeData,
  retrieveData,
};
