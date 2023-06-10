import taskStore from './task-store.js';

const createTaskButton = document.querySelector('#createTaskButton');
const taskDialog = document.querySelector('#taskDialog');
const confirmButton = taskDialog.querySelector('#createDialogButton');
const cancelButton = document.querySelector('#cancelButton');
const deleteButton = document.querySelector('.task-delete');
const taskList = document.querySelector('.task-list');
const taskTitle = document.querySelector('#taskTitle');
const taskImportance = document.querySelector('#taskImportance');
const taskDueDate = document.querySelector('#taskDueDate');
const taskDescription = document.querySelector('#taskDescription');
// const taskCompletion = document.querySelector('#taskCompletion');

/* const myNewTask = {
  id: '42', title: 'Task 42', description: 'This is a description', importance: 1,
  dueDate: '2023-06-10', creationDate: '2023-06-10', completion: true,
}; */

function addATask() {
  // console.log('add task');
  // taskStore.addTask(myNewTask);
}

function editTask(event) {
  const element = event.target.parentElement.parentElement; // the task container
  taskTitle.value = element.querySelector('.task-title').textContent;
  taskImportance.value = element.querySelector('.task-importance').textContent;
  taskDescription.value = element.querySelector('.task-description').textContent;
  taskDialog.querySelector('h2').textContent = 'Edit this task';
  taskDialog.querySelector('#createDialogButton').textContent = 'Save';
  taskDialog.showModal();
}

function completeTask(event) {
  if (event.target.classList.contains('task-complete')) {
    event.preventDefault();
    const element = event.target.parentElement;
    element.classList.toggle('completed');
  }
}

function deleteTask(event) {
  if (event.target.classList.contains('task-delete')) {
    event.preventDefault();
    const element = event.target.parentElement.parentElement;
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

function createTask() {
  const title = (taskTitle.value !== '') ? taskTitle.value : 'My Task Title';
  const dueDate = (taskDueDate.value !== '') ? taskDueDate.value : 'today';
  const description = (taskDescription.value !== '') ? taskDescription.value : 'No description';
  let importance = (taskImportance.value !== '') ? taskImportance.value : '3';
  importance = importance < 0 ? 0 : importance;
  importance = importance > 5 ? 5 : importance;
  taskList.insertAdjacentHTML(
    'beforeend',
    `<article class="task-container">
      <button class="btn task-complete" >Complete</button>
      <div class="task-content">
        <h3 class="task-title">${title}</h3>
        <p class="task-description">${description}</p>
      </div>
      <p class="task-due-date">Due ${dueDate}</p>
      <p class="task-created-date" >Created ${dueDate}</p>
      <p >Importance: <span class="task-importance">${importance}</span></p>
      <div class="buttongroup">
        <button class="btn task-delete">Delete</button>
        <button class="btn task-edit">Edit</button>
      </div>
    </article>`,
  );
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('task-delete')) {
    deleteTask(event);
  }
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('task-complete')) {
    completeTask(event);
  }
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('task-edit')) {
    editTask(event);
  }
});

createTaskButton.addEventListener('click', () => {
  taskDialog.querySelector('h2').textContent = 'Create a task';
  taskDialog.querySelector('#createDialogButton').textContent = 'Create';
  taskDialog.querySelector('#taskImportance').value = 3;
  taskDialog.showModal();
});

confirmButton.addEventListener('click', (e) => {
  e.preventDefault();
  createTask();
  addATask();
  taskDialog.close();
  clearDialog();
});


cancelButton.addEventListener('click', (e) => {
  e.preventDefault();
  taskDialog.close();
  clearDialog();
});
