const tasks = [];
const defaultTasks = [
  {
    id: 'z01', title: 'Go for a run', dueDate: '22.6.2023', creationDate: '15.6.2023', description: 'Description', importance: 1, completion: false,
  },
  {
    id: 'z02', title: 'Bring hamster to yoga class', dueDate: '11.2.2021', creationDate: '1.1.2021', description: 'Bring yoga mat', importance: 5, completion: false,
  },
  {
    id: 'z03', title: 'Create default tasks', dueDate: '29.8.2022', creationDate: '15.6.2022', description: 'With some permutations', importance: 2, completion: true,
  },
];

function addTask(taskToAdd) {
  tasks.push(taskToAdd);
  // console.clear();
  console.table(tasks);
}

function removeTask(indexToremove) {
  tasks.splice(indexToremove, 1);
  // console.clear();
  console.table(tasks);
}

function updateTask(taskToUpdate, index) {
  tasks[index] = taskToUpdate;
  // console.clear();
  console.table(tasks);
}

function compareTasks(task1, task2) {
  if (task1.dueDate < task2.dueDate) {
    return -1;
  }
  if (task1.dueDate > task2.dueDate) {
    return 1;
  }
  return 0;
}

function sortByKey(array, key) {
  return array.sort((a, b) => {
    const x = a[key];
    const y = b[key];
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
}

function defTasks() {
  return defaultTasks;
}

function tasksSorted(key) {
  // console.log(`sort by: ${key}`);
  return sortByKey(tasks, key);
}

export default {
  tasksSorted,
  compareTasks,
  defTasks,
  defaultTasks,
  tasks,
  addTask,
  removeTask,
  updateTask,
  sortByKey,
};
