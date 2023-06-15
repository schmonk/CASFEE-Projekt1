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
      return arr[i]; // Found the object, return it
    }
  }
  return null; // Object not found
}

function openEditDialog(event) {
  const element = event.target.parentElement.parentElement; // the task container
  const currentId = element.id.toString();
  console.log(element);
  /*   const retrievedTask = localStorage.getItem(currentId);
  // currentEditId = element.id.toString();
  const parsedTask = JSON.parse(retrievedTask); */
  taskTitle.value = 'test';
  taskImportance.value = 3;
  taskDescription.value = 'desc';
  taskCompletion.checked = true;
  taskDialog.classList.add(`${currentId}`);
  taskDialog.querySelector('h2').textContent = `Edit "${taskTitle.value}"`;
  taskDialog.querySelector('#saveDialogButton').textContent = 'Update';
  taskDialog.querySelector('#saveDialogButton').classList.add('task-update');
  taskDialog.querySelector('#saveDialogButton').classList.remove('task-create');
  taskDialog.showModal();
}

function updateElementInList(element) {
  element.querySelector('.task-title').textContent = title;
  element.querySelector('.task-description').textContent = description;
  element.querySelector('.task-importance').textContent = importance;
  element.querySelector('.task-due-date').textContent = `Due ${dueDate}`;
  element.querySelector('.task-created-date').textContent = `Created ${dueDate}`;
}
function updateTask() {
  const title = (taskTitle.value !== '') ? taskTitle.value : 'My Task Title';
  const dueDate = (taskDueDate.value !== '') ? taskDueDate.value : 'today';
  const description = (taskDescription.value !== '') ? taskDescription.value : '';
  let importance = (taskImportance.value !== '') ? taskImportance.value : '3';
  importance = importance < 0 ? 0 : importance;
  importance = importance > 5 ? 5 : importance;
  const id = taskDialog.classList.item[0];
  console.log(id);
  const newTask = {
    id,
    title,
    dueDate,
    description,
    importance,
  };
  console.log(`newTask: ${newTask}`);
  const element = taskList.querySelector(`#${id}`);
  updateElementInList(element);
  const indexToUpdate = tasks.indexOf(findObject(tasks, 'id', element.id.toString()));
  console.log(`update this ID: ${indexToUpdate}`);
  // localStorage.setItem(`${id}`, JSON.stringify(newTask));
}

function createId() {
  return `${Date.now().toString()}`;
}

function createCreationDate() {
  const today = Date.now();
  return formatDate(today);
}

function createDueDate() {
  const dueDate = new Date(`${taskDueDate.value}`);
  return formatDate(dueDate);
}

function createDefaultDueDate() {
  const days = 7; // how far in the future is the default due date?
  let date = new Date();
  date.setDate(date.getDate() + days);
  return formatDate(date);
}

function formatDate(date) {
  const dateFormatOptions = { day: 'numeric', month: 'numeric', year: 'numeric'};
  const dateFormat = new Intl.DateTimeFormat('de-DE', dateFormatOptions);
  return dateFormat.format(date);
}

function clamp (value, lower, upper) {
  if (value < lower) {
    value = lower;
  } else if (value > upper) {
    value = upper;
  }
  return value;
}

function createTask(e) {
  e.preventDefault();
  const id = createId();
  const title = taskTitle.value ? taskTitle.value : placeholderTaskTitle;
  const description = taskTitle.value ? taskDescription.value : placeholderTaskDescription;
  const completion = taskCompletion.checked;
  const creationDate = createCreationDate();
  const dueDate = (taskDueDate.value !== '') ? taskDueDate.value : createDefaultDueDate();
  let importance = (taskImportance.value !== '') ? clamp(taskImportance.value, 0, 5) : '3';

  const newTask = {
    id,
    title,
    dueDate,
    creationDate,
    description,
    importance,
    completion,
  };

  taskList.insertAdjacentHTML(
    'beforeend',
    `<article id="${newTask.id}" class="task-container ${(newTask.completion) ? 'completed' : ''}">
    <input type="checkbox" name="completion" class="taskCheckbox" ${(newTask.completion) ? 'checked' : ''}/>
      <div class="task-content">
        <h3 class="task-title">${newTask.title}</h3>
        <p class="task-description">${newTask.description}</p>
      </div>
      <p class="task-due-date">Due ${newTask.dueDate}</p>
      <p class="task-created-date" >Created ${newTask.creationDate}</p>
      <p >Importance: <span class="task-importance">${newTask.importance}</span></p>
      <div class="buttongroup">
        <button class="btn task-delete">Delete</button>
        <button class="btn task-edit">Edit</button>
      </div>
    </article>`,
  );
  tasks.push(newTask);
  console.log(`newtask id: ${newTask.id}`);
  // console.log(`tasks are: ${tasks}`);
  console.log(tasks);
}

function deleteTask(event) {
  if (event.target.classList.contains('task-delete')) {
    event.preventDefault();
    const element = event.target.parentElement.parentElement;
    const indexToremove = tasks.indexOf(findObject(tasks, 'id', element.id.toString()));
    tasks.splice(indexToremove, 1);
    element.remove();
    console.log(tasks);
  }
}
if (deleteButton) {
  deleteButton.addEventListener('click', (event) => {
    deleteTask(event);
  });
}

function clearDialog() {
  taskTitle.value = '';
  taskDueDate.value = '';
  taskDescription.value = '';
  taskImportance.value = '';
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
    updateTask();
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

