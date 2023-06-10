const tasks = [
  {
    id: '01', title: 'Task 1', description: 'This is a description', importance: 3, dueDate: '2023-06-10', creationDate: '2023-06-10', completion: false,
  },
  {
    id: '02', title: 'Task 2', description: 'This is a description', importance: 1, dueDate: '2023-06-10', creationDate: '2023-06-10', completion: true,
  },
];

function addTask(task) {
  // console.log(`task store adds this task: ${task.title}`);
  tasks.push(task);
}

function findTask(taskId) {
  console.log(taskId);
  return tasks.find(/* test */);
}

function deleteTask(taskId) {
  console.log(taskId);
  const targetIndex = findTask(taskId).id;
  tasks.splice(targetIndex, 1);
}

function listTasks() {
  // console.log('listing tasks here..');
  return tasks;
}
export default {
  tasks, listTasks, addTask, findTask, deleteTask,
};
