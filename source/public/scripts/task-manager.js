// eslint-disable-next-line import/extensions
import sm from './storage-manager.js';

const tasks = [];
const defaultTasks = [
  {
    id: 'z01', title: 'Go for a run', dueDate: '22.6.2023', creationDate: '15.6.2023', description: 'If walking kids overtake you, go faster', importance: 1, completion: false,
  },
  {
    id: 'z02', title: 'Bring hamster to yoga class', dueDate: '11.2.2021', creationDate: '1.1.2021', description: 'Bring yoga mat', importance: 5, completion: false,
  },
  {
    id: 'z03', title: 'Create default tasks', dueDate: '29.8.2024', creationDate: '11.6.2011', description: 'With some permutations', importance: 2, completion: true,
  },
  {
    id: 'z04', title: 'A few things things', dueDate: '29.8.2026', creationDate: '8.6.1980', description: 'Stuff', importance: 3, completion: true,
  },
  {
    id: 'z05', title: 'Ze World domination', dueDate: '1.2.1990', creationDate: '15.6.2022', description: 'The squirrels might help you', importance: 4, completion: false,
  },
];

sm.storeData(defaultTasks);
sm.retrieveData();
function clearAndLog() {
/*   console.clear();
  console.table(tasks); */
}

function addTask(taskToAdd) {
  tasks.push(taskToAdd);
  clearAndLog();
}

function removeTask(indexToremove) {
  tasks.splice(indexToremove, 1);
  clearAndLog();
}

function updateTask(taskToUpdate, index) {
  tasks[index] = taskToUpdate;
  clearAndLog();
}

function sortByKey(array, key, isAscending) {
  return array.sort((a, b) => {
    const x = a[key];
    const y = b[key];
    const sortingDirection = isAscending ? 1 : -1;
    if (x < y) {
      return -1 * sortingDirection;
    }
    if (x > y) {
      return 1 * sortingDirection;
    }
    return 0;
  });
}

function returnDefaultTasks() {
  return defaultTasks;
}

function tasksSorted(key, isAscending) {
  return sortByKey(tasks, key, isAscending);
}

export default {
  tasksSorted,
  returnDefaultTasks,
  addTask,
  removeTask,
  updateTask,
  sortByKey,
  defaultTasks,
  tasks,
};
