// eslint-disable-next-line import/extensions
import tm from './task-manager.js';

const createTaskButton = document.querySelector('#createTaskButton');
const taskDialog = document.querySelector('.taskDialog');
const cancelButton = document.querySelector('#cancelButton');
const taskList = document.querySelector('.task-list');
const taskTitle = document.querySelector('#taskTitle');
const taskImportance = document.querySelector('#taskImportance');
const taskDueDate = document.querySelector('#taskDueDate');
const taskDescription = document.querySelector('#taskDescription');
const taskCompletion = document.querySelector('#taskCompletion');
/* const sortDueDateButton = document.querySelector('#sortDueDate');
const sortNameButton = document.querySelector('#sortName');
const sortCreationDateButton = document.querySelector('#sortCreationDate');
const sortImportanceButton = document.querySelector('#sortImportance'); */
const filterCompletedButton = document.querySelector('#filterCompleted');
const filterSortContainer = document.querySelector('.filterSort-container');

const placeholderTaskTitle = 'My task';
const placeholderTaskDescription = 'Task description';

function insertImportanceStars(amount) {
  let stars = '';
  for (let i = 0; i < amount; i += 1) {
    stars += '&#9733';
  }
  return stars;
}

function createTaskHTML(task) {
  let hiddenString = 'completed';
  if (filterCompletedButton.classList.contains('filtering-active')) {
    hiddenString = 'completed hidden';
  }
  return `<article id="${task.id}" data-id="${task.id}" class="task-container ${(task.completion) ? hiddenString : ''}">
  <input type="checkbox" name="completion" class="task-completion" ${(task.completion) ? 'checked' : ''}/>
    <div class="task-content">
      <h3 class="task-title">${task.title}</h3>
      <p class="task-description">${task.description}</p>
    </div>
    <p class="task-due-date">Due ${task.dueDate}</p>
    <p class="task-created-date" >Created ${task.creationDate}</p>
    <p ><span class="task-importance">${insertImportanceStars(task.importance)}</span></p>
    <div class="buttongroup">
    <button class="btn task-delete">Delete</button>
    <button class="btn task-edit">Edit</button>
    </div>
    </article>`;
}

function addTaskToDOM(task) {
  taskList.insertAdjacentHTML('beforeend', createTaskHTML(task));
}

function renderTasks(sortedTaskArray) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  for (let i = 0; i < sortedTaskArray.length; i += 1) {
    addTaskToDOM(sortedTaskArray[i]);
  }
}

function sortTasks(property = 'creationDate', ascendingState = true) {
  const sortedArray = tm.tasksSorted(`${property}`, ascendingState);
  renderTasks(sortedArray);
}

function findObject(myArray, property, value) {
  for (let i = 0; i < myArray.length; i += 1) {
    if (myArray[i][property] === value) {
      return myArray[i]; // Return object if found
    }
  }
  return null; // Object not found
}

function clamp(value, lower, upper) {
  let myValue = value;
  if (myValue < lower) {
    myValue = lower;
  } else if (myValue > upper) {
    myValue = upper;
  }
  return myValue;
}

function createId() {
  return `${Date.now().toString()}`;
}

function formatDate(date, isForDisplay) {
  const dateFormatOptions = { day: 'numeric', month: 'numeric', year: 'numeric' };
  const dateDisplayFormat = new Intl.DateTimeFormat('de-CH', dateFormatOptions);
  const datePickerFormat = new Intl.DateTimeFormat('en-US', dateFormatOptions);
  const dateFormat = isForDisplay ? dateDisplayFormat : datePickerFormat;
  return dateFormat.format(date);
}

function createCreationDate() {
  const today = Date.now();
  return formatDate(today, true);
}

function createDefaultDueDate() {
  const days = 7; // how many days in the future is the default due date?
  const date = new Date();
  date.setDate(date.getDate() + days);
  return formatDate(date, true);
}

function createTask(e) {
  e.preventDefault();
  /*   console.log(`due date: ${taskDueDate.value}, type: ${typeof taskDueDate.value}`);
  console.log(`parsed back: ${Date.parse(taskDueDate.value)}`); */
  const newTask = {
    id: createId(),
    title: taskTitle.value ? taskTitle.value : placeholderTaskTitle,
    dueDate: taskDueDate.value ? taskDueDate.value : createDefaultDueDate(),
    creationDate: createCreationDate(),
    description: taskDescription.value ? taskDescription.value : placeholderTaskDescription,
    importance: taskImportance.value ? clamp(taskImportance.value, 1, 5) : '3',
    completion: taskCompletion.checked,
  };
  addTaskToDOM(newTask);
  tm.addTask(newTask);
  sortTasks();
}
function updateTask(event) {
  event.preventDefault();
  const existingTask = findObject(tm.tasksSorted(), 'id', taskDialog.id);
  const task = {
    id: existingTask.id,
    title: taskTitle.value ? taskTitle.value : existingTask.title,
    dueDate: taskDueDate.value ? taskDueDate.value : existingTask.dueDate,
    creationDate: existingTask.creationDate,
    description: taskDescription.value ? taskDescription.value : existingTask.description,
    importance: taskImportance.value ? clamp(taskImportance.value, 1, 5) : existingTask.importance,
    completion: taskCompletion.checked,
  };
  const indexToUpdate = tm.tasksSorted().indexOf(findObject(tm.tasksSorted(), 'id', taskDialog.id.toString()));
  tm.updateTask(task, indexToUpdate);
  sortTasks();
}

function deleteTask(event) {
  event.preventDefault();
  const element = event.target.parentElement.parentElement;
  const indexToremove = tm.tasksSorted().indexOf(findObject(tm.tasksSorted(), 'id', element.id.toString()));
  tm.removeTask(indexToremove);
  element.remove();
  sortTasks();
}

function toggleCompletion(event) {
  const taskContainer = event.target.parentElement;
  taskContainer.classList.toggle('completed');
  const currentId = taskContainer.id.toString();
  const existingTask = findObject(tm.tasksSorted(), 'id', currentId);
  existingTask.completion = !existingTask.completion;
  const indexToUpdate = tm.tasksSorted().indexOf(findObject(tm.tasksSorted(), 'id', currentId));
  tm.updateTask(existingTask, indexToUpdate);
}

function clearDialog() {
  taskTitle.value = '';
  taskDueDate.value = '';
  taskDescription.value = '';
  taskImportance.value = '';
  taskCompletion.checked = false;
}
function setupEditDialog(title) {
  taskDialog.querySelector('h2').textContent = `Edit "${title}"`;
  taskDialog.querySelector('#saveDialogButton').textContent = 'Update';
  taskDialog.querySelector('#saveDialogButton').classList.add('task-update');
  taskDialog.querySelector('#saveDialogButton').classList.remove('task-create');
}

function openEditDialog(event) {
  const taskContainer = event.target.parentElement.parentElement; // the task container
  const currentId = taskContainer.id.toString();
  const existingTask = findObject(tm.tasksSorted(), 'id', currentId);
  taskTitle.value = existingTask.title;
  taskImportance.value = existingTask.importance;
  taskDescription.value = existingTask.description;
  taskCompletion.checked = existingTask.completion;
  taskDueDate.value = `${existingTask.dueDate}`; // does not work yet
  taskDialog.id = currentId;
  setupEditDialog(existingTask.title);
  taskDialog.showModal();
}

function setupCreationDialog() {
  taskDialog.querySelector('h2').textContent = 'Create a task';
  taskDialog.querySelector('#saveDialogButton').textContent = 'Create';
  taskDialog.querySelector('#taskImportance').value = 3;
  // taskDialog.querySelector('#taskDueDate').valueAsDate = new Date();
  taskDialog.querySelector('#saveDialogButton').classList.add('task-create');
  taskDialog.querySelector('#saveDialogButton').classList.remove('task-update');
}

function filterCompletedTasks() {
  filterCompletedButton.classList.toggle('filtering-active');
  if (filterCompletedButton.classList.contains('filtering-active')) {
    filterCompletedButton.textContent = 'Show completed';
    for (let i = 0; i < tm.tasksSorted().length; i += 1) {
      if (tm.tasksSorted()[i].completion === true) {
        const element = taskList.querySelector(`#${tm.tasksSorted()[i].id}`);
        if (!element.classList.contains('hidden')) {
          element.classList.add('hidden');
        } else {
          element.classList.remove('hidden');
        }
      }
    }
  } else {
    filterCompletedButton.textContent = 'Hide completed';
    for (let i = 0; i < tm.tasksSorted().length; i += 1) {
      if (tm.tasksSorted()[i].completion === true) {
        const element = taskList.querySelector(`#${tm.tasksSorted()[i].id}`);
        element.classList.remove('hidden');
      }
    }
  }
}

function toggleSortingButtons(keepOnClass) {
  const sortingButtons = document.querySelectorAll('.sort-button');
  let sortingDirection = 0;
  for (let i = 0; i < sortingButtons.length; i += 1) {
    if (!sortingButtons[i].classList.contains(keepOnClass)) {
      sortingButtons[i].classList.remove('sorting-active');
      sortingButtons[i].classList.remove('ascending');
      sortingButtons[i].classList.remove('descending');
    } else {
      sortingButtons[i].classList.add('sorting-active');
      if (sortingButtons[i].classList.contains('ascending')) {
        sortingButtons[i].classList.remove('ascending');
        sortingButtons[i].classList.add('descending');
        sortingDirection = 1;
      } else {
        sortingButtons[i].classList.remove('descending');
        sortingButtons[i].classList.add('ascending');
        sortingDirection = 0;
      }
    }
  }
  return sortingDirection;
}

function toggleSortingDirection(keepOnClass, ascendingState) {
  const sortingButtons = document.querySelectorAll('.sort-button');
  for (let i = 0; i < sortingButtons.length; i += 1) {
    if (sortingButtons[i].classList.contains('sorting-active') && ascendingState) {
      sortingButtons[i].classList.remove('ascending');
      sortingButtons[i].classList.add('descending');
    } else if (sortingButtons[i].classList.contains('sorting-active') && !ascendingState) {
      sortingButtons[i].classList.remove('descending');
      sortingButtons[i].classList.add('ascending');
    }
  }
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('task-completion')) {
    toggleCompletion(event);
  }
});

createTaskButton.addEventListener('click', () => {
  setupCreationDialog();
  taskDialog.showModal();
});

cancelButton.addEventListener('click', (e) => {
  e.preventDefault();
  taskDialog.close();
  clearDialog();
});

filterSortContainer.addEventListener('click', (event) => {
  event.preventDefault();
  switch (event.target.id) {
    case 'filterCompleted':
      filterCompletedTasks();
      break;

    case 'sortDueDate': {
      const ascendingTrue = toggleSortingButtons('dueDate');
      sortTasks('dueDate', ascendingTrue);
      break;
    }
    case 'sortName': {
      const ascendingTrue = toggleSortingButtons('title');
      sortTasks('title', ascendingTrue);
      break;
    }
    case 'sortCreationDate': {
      const ascendingTrue = toggleSortingButtons('creationDate');
      sortTasks('creationDate', ascendingTrue);
      break;
    }
    case 'sortImportance': {
      const ascendingTrue = toggleSortingButtons('importance');
      sortTasks('importance', ascendingTrue);
      break;
    }
    default:
      break;
  }
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('task-delete')) {
    deleteTask(event);
  }
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('task-update')) {
    updateTask(event);
    taskDialog.querySelector('#saveDialogButton').classList.remove('task-update');
    taskDialog.close();
    clearDialog();
  }
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('task-edit')) {
    openEditDialog(event);
  }
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('task-create') && !event.target.classList.contains('task-update')) {
    createTask(event);
    taskDialog.close();
    clearDialog();
  }
});

function initializeTasks(fromStorage) {
  const initialTaskList = fromStorage ? tm.getFromStorage('myTasks') : tm.defaultTasksSorted();
  initialTaskList.forEach((element) => {
    tm.addTask(element);
  });
  const retrievedSorting = tm.getFromStorage('mySorting');
  toggleSortingButtons(retrievedSorting.mySortingType);
  toggleSortingDirection(retrievedSorting.mySortingType, retrievedSorting.myAscendingState);
  sortTasks(retrievedSorting.mySortingType, retrievedSorting.myAscendingState);
}

document.addEventListener('DOMContentLoaded', () => {
  if (tm.getFromStorage('myTasks') === null || tm.getFromStorage('myTasks').length === 0) {
    initializeTasks(false); // no stored tasks; initialize default tasks
  } else {
    initializeTasks(true); // there are stored tasks
  }
});
