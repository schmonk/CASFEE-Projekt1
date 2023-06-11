// import { tasks } from './tasks.json'; // gives disallowed MIME type error

const createTaskButton = document.querySelector('#createTaskButton');
const taskDialog = document.querySelector('#taskDialog');
// const saveButton = taskDialog.querySelector('#saveDialogButton');
const cancelButton = document.querySelector('#cancelButton');
const deleteButton = document.querySelector('.task-delete');
const taskList = document.querySelector('.task-list');
const taskTitle = document.querySelector('#taskTitle');
const taskImportance = document.querySelector('#taskImportance');
const taskDueDate = document.querySelector('#taskDueDate');
const taskDescription = document.querySelector('#taskDescription');
let currentEditId = '';

function openEditDialog(event) {
  const element = event.target.parentElement.parentElement; // the task container
  const retrievedTask = localStorage.getItem(element.id.toString());
  // console.log(`edit this id: ${element.id.toString()}`);
  currentEditId = element.id.toString();
  console.log(`currentEditId is: ${currentEditId}`);
  const parsedTask = JSON.parse(retrievedTask);
  taskTitle.value = parsedTask.title;
  taskImportance.value = parsedTask.importance;
  taskDescription.value = parsedTask.description;
  taskDialog.querySelector('h2').textContent = `Edit "${taskTitle.value}"`;
  taskDialog.querySelector('#saveDialogButton').textContent = 'Update';
  taskDialog.querySelector('#saveDialogButton').classList.add('task-update');
  taskDialog.querySelector('#saveDialogButton').classList.remove('task-create');
  taskDialog.showModal();
}
function updateTask() {
  console.log(`update id: ${currentEditId}`);
  const title = (taskTitle.value !== '') ? taskTitle.value : 'My Task Title';
  const dueDate = (taskDueDate.value !== '') ? taskDueDate.value : 'today';
  const description = (taskDescription.value !== '') ? taskDescription.value : '';
  let importance = (taskImportance.value !== '') ? taskImportance.value : '3';
  importance = importance < 0 ? 0 : importance;
  importance = importance > 5 ? 5 : importance;
  const id = currentEditId;
  const newTask = {
    id,
    title,
    dueDate,
    description,
    importance,
  };
  localStorage.setItem(`${id}`, JSON.stringify(newTask));
}

function createId() {
  return Date.now().toString();
}

function createTask() {
  const id = createId();
  const title = (taskTitle.value !== '') ? taskTitle.value : 'My Task Title';
  const dueDate = (taskDueDate.value !== '') ? taskDueDate.value : 'today';
  const description = (taskDescription.value !== '') ? taskDescription.value : '';
  let importance = (taskImportance.value !== '') ? taskImportance.value : '3';
  importance = importance < 0 ? 0 : importance;
  importance = importance > 5 ? 5 : importance;
  const newTask = {
    id,
    title,
    dueDate,
    description,
    importance,
  };
  taskList.insertAdjacentHTML(
    'beforeend',
    `<article id="${newTask.id}" class="task-container">
      <button class="btn task-complete" >Complete</button>
      <div class="task-content">
        <h3 class="task-title">${newTask.title}</h3>
        <p class="task-description">${newTask.description}</p>
      </div>
      <p class="task-due-date">Due ${newTask.dueDate}</p>
      <p class="task-created-date" >Created ${newTask.dueDate}</p>
      <p >Importance: <span class="task-importance">${newTask.importance}</span></p>
      <div class="buttongroup">
        <button class="btn task-delete">Delete</button>
        <button class="btn task-edit">Edit</button>
      </div>
    </article>`,
  );
  localStorage.setItem(`${id}`, JSON.stringify(newTask));
}

function deleteTask(event) {
  if (event.target.classList.contains('task-delete')) {
    event.preventDefault();
    const element = event.target.parentElement.parentElement;
    localStorage.removeItem(element.id.toString());
    element.remove();
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

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('task-delete')) {
    deleteTask(event);
  }
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('task-update')) {
    // alert(`update task`);
    updateTask();
    taskDialog.querySelector('#saveDialogButton').classList.remove('task-update');
    taskDialog.close();
    clearDialog();
  }
});

/* document.addEventListener('click', (event) => {
  if (event.target.classList.contains('task-complete')) {
    completeTask(event);
  }
}); */

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('task-edit')) {
    openEditDialog(event);
  }
});

document.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.classList.contains('task-create') && !event.target.classList.contains('task-update')) {
    // console.log('create a new task');
    createTask(event);
    taskDialog.close();
    clearDialog();
  }
});

createTaskButton.addEventListener('click', () => {
  taskDialog.querySelector('h2').textContent = 'Create a task';
  taskDialog.querySelector('#saveDialogButton').textContent = 'Create';
  taskDialog.querySelector('#taskImportance').value = 3;
  taskDialog.querySelector('#saveDialogButton').classList.add('task-create');
  taskDialog.querySelector('#saveDialogButton').classList.remove('task-update');
  taskDialog.showModal();
});

cancelButton.addEventListener('click', (e) => {
  e.preventDefault();
  taskDialog.close();
  clearDialog();
});
