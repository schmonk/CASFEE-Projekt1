const tasks = [];

function renderTasks() {
  // render;
}

function addTask() {
  console.log('add to array');
  tasks.push();
  return tasks.length;
}

function updateTask() {
  console.log('update array');
  // update;
}

function removeTask() {
  // delete;
}
addTask();
updateTask();
removeTask();
renderTasks();

export default {
  addTask, updateTask, removeTask, renderTasks,
};
