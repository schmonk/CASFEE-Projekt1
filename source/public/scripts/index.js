// eslint-disable-next-line import/extensions
import tm from './task-manager.js';

const createTaskButton = document.querySelector('#createTaskButton');
const taskDialog = document.querySelector('.taskDialog');
const cancelButton = document.querySelector('#cancelButton');
const deleteButton = document.querySelector('.task-delete');
const taskList = document.querySelector('.task-list');
const taskTitle = document.querySelector('#taskTitle');
const taskImportance = document.querySelector('#taskImportance');
const taskDueDate = document.querySelector('#taskDueDate');
const taskDescription = document.querySelector('#taskDescription');
const taskCompletion = document.querySelector('#taskCompletion');
const localStorageKey = 'myTasks';
const placeholderTaskTitle = 'Task title';
const placeholderTaskDescription = 'Task description';
const tasks = [];

console.log(`localStorageKey is: ${localStorageKey}`);

function findObject(arr, property, value) {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][property] === value) {
      return arr[i]; // Return object if found
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

function setupEditDialog(title) {
  taskDialog.querySelector('h2').textContent = `Edit "${title}"`;
  taskDialog.querySelector('#saveDialogButton').textContent = 'Update';
  taskDialog.querySelector('#saveDialogButton').classList.add('task-update');
  taskDialog.querySelector('#saveDialogButton').classList.remove('task-create');
}

function openEditDialog(event) {
  const element = event.target.parentElement.parentElement; // the task container
  const currentId = element.id.toString();
  const existingTask = findObject(tm.tasks, 'id', currentId);

  taskTitle.value = existingTask.title;
  taskImportance.value = existingTask.importance;
  taskDescription.value = existingTask.description;
  taskCompletion.checked = existingTask.completion;
  taskDueDate.value = existingTask.dueDate; // does not work yet
  taskDialog.id = currentId;
  setupEditDialog(existingTask.title);

  taskDialog.showModal();
}

function updateElementInList(element, task) {
  const el = element;
  const ta = task;
  el.querySelector('.task-title').textContent = ta.title;
  el.querySelector('.task-description').textContent = ta.description;
  el.querySelector('.task-importance').textContent = ta.importance;
  el.querySelector('.task-due-date').textContent = `Due ${ta.dueDate}`;
  el.querySelector('.task-created-date').textContent = `Created ${ta.creationDate}`;
  el.querySelector('.task-completion').checked = ta.completion;
  el.classList.toggle('completed');
}

function updateTask(event) {
  event.preventDefault();
  const existingTask = findObject(tm.tasks, 'id', taskDialog.id);

  const task = {
    id: existingTask.id,
    title: taskTitle.value ? taskTitle.value : existingTask.title,
    dueDate: taskDueDate.value ? taskDueDate.value : existingTask.dueDate,
    creationDate: existingTask.creationDate,
    description: taskDescription.value ? taskDescription.value : existingTask.description,
    importance: taskImportance.value ? clamp(taskImportance.value, 0, 5) : existingTask.importance,
    completion: taskCompletion.checked,
  };
  const element = taskList.querySelector(`#${existingTask.id}`);
  updateElementInList(element, task);
  const indexToUpdate = tm.tasks.indexOf(findObject(tm.tasks, 'id', taskDialog.id.toString()));
  tm.tasks[indexToUpdate] = task;
}

function createId() {
  return `z${Date.now().toString()}`;
}

function formatDate(date) {
  const dateFormatOptions = { day: 'numeric', month: 'numeric', year: 'numeric' };
  const dateFormat = new Intl.DateTimeFormat('de-DE', dateFormatOptions);
  return dateFormat.format(date);
}

function createCreationDate() {
  const today = Date.now();
  return formatDate(today);
}

/* function createDueDate() {
  const dueDate = new Date(`${taskDueDate.value}`);
  return formatDate(dueDate);
} */

function createDefaultDueDate() {
  const days = 7; // how many days in the future is the default due date?
  const date = new Date();
  date.setDate(date.getDate() + days);
  return formatDate(date);
}

function createTaskHTML(task) {
  return `<article id="${task.id}" class="task-container ${(task.completion) ? 'completed' : ''}">
  <input type="checkbox" name="completion" class="task-completion" ${(task.completion) ? 'checked' : ''}/>
    <div class="task-content">
      <h3 class="task-title">${task.title}</h3>
      <p class="task-description">${task.description}</p>
    </div>
    <p class="task-due-date">Due ${task.dueDate}</p>
    <p class="task-created-date" >Created ${task.creationDate}</p>
    <p >Importance: <span class="task-importance">${task.importance}</span></p>
    <div class="buttongroup">
      <button class="btn task-delete">Delete</button>
      <button class="btn task-edit">Edit</button>
    </div>
  </article>`;
}

function addTaskToDOM(task) {
  taskList.insertAdjacentHTML('beforeend', createTaskHTML(task));
}

function createTask(e) {
  e.preventDefault();
  const newTask = {
    id: createId(),
    title: taskTitle.value ? taskTitle.value : placeholderTaskTitle,
    dueDate: taskDueDate.value ? taskDueDate.value : createDefaultDueDate(),
    creationDate: createCreationDate(),
    description: taskDescription.value ? taskDescription.value : placeholderTaskDescription,
    importance: taskImportance.value ? clamp(taskImportance.value, 0, 5) : '3',
    completion: taskCompletion.checked,
  };
  addTaskToDOM(newTask);
  tm.addTask(newTask);
}

function deleteTask(event) {
  event.preventDefault();
  const element = event.target.parentElement.parentElement;
  const indexToremove = tm.tasks.indexOf(findObject(tasks, 'id', element.id.toString()));
  tm.removeTask(indexToremove);
  element.remove();
}
if (deleteButton) {
  deleteButton.addEventListener('click', (event) => {
    deleteTask(event);
  });
}

function toggleCompletion(event) {
  const taskContainer = event.target.parentElement;
  taskContainer.classList.toggle('completed');
  // updateCompletion(event);
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('task-completion')) {
    // console.log('bong');
    toggleCompletion(event);
  }
});

function clearDialog() {
  taskTitle.value = '';
  taskDueDate.value = '';
  taskDescription.value = '';
  taskImportance.value = '';
  taskCompletion.checked = false;
}
function setupCreationDialog() {
  taskDialog.querySelector('h2').textContent = 'Create a task';
  taskDialog.querySelector('#saveDialogButton').textContent = 'Create';
  taskDialog.querySelector('#taskImportance').value = 3;
  taskDialog.querySelector('#saveDialogButton').classList.add('task-create');
  taskDialog.querySelector('#saveDialogButton').classList.remove('task-update');
}

createTaskButton.addEventListener('click', () => {
  setupCreationDialog();
  taskDialog.showModal();
});

cancelButton.addEventListener('click', (e) => {
  e.preventDefault();
  taskDialog.close();
  clearDialog();
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

function initializeDefaultTasks() {
  const loadedDefaultTasks = tm.defaultTasks;
  for (let i = 0; i < loadedDefaultTasks.length; i += 1) {
    addTaskToDOM(loadedDefaultTasks[i]);
    tm.addTask(loadedDefaultTasks[i]);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (tm.tasks.length === 0) {
    initializeDefaultTasks();
  }
});
