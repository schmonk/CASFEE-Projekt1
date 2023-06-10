import taskStore from './task-store.js';

const createTaskButton = document.querySelector('#createTaskButton');
const taskDialog = document.querySelector('#taskDialog');
const confirmButton = taskDialog.querySelector('#createDialogButton');
const cancelButton = document.querySelector('#cancelButton');
const taskList = document.querySelector('.task-list');
const deleteButton = document.querySelector('.task-delete');
const taskTitle = document.querySelector('#taskTitle');
const taskImportance = document.querySelector('#taskImportance');
const taskDueDate = document.querySelector('#taskDueDate');
// const taskCompletion = document.querySelector('#taskCompletion');
const taskDescription = document.querySelector('#taskDescription');

const myNewTask = {
  id: '42', title: 'Task 42', description: 'This is a description', importance: 1, dueDate: '2023-06-10', creationDate: '2023-06-10', completion: true,
};

function addATask() {
  console.log('add task');
  taskStore.addTask(myNewTask);
}

function completeTask(event) {
  if (event.target.classList.contains('task-complete')) {
    console.log('toggle completion');
    event.preventDefault();
    const element = event.target.parentElement;
    element.classList.toggle('completed');
  }
}

function deleteTask(event) {
  if (event.target.classList.contains('task-delete')) {
    console.log('delete maybe?');
    event.preventDefault();
    const element = event.target.parentElement;
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
  const importance = (taskImportance.value !== '') ? taskImportance.value : '3';
  taskList.insertAdjacentHTML(
    'beforeend',
    `<article class="task-container">
      <button class="btn task-complete" >Complete</button>
      <div class="task-content">
        <h3>${title}</h3>
        <p>${description}</p>
      </div>
      <p>Due ${dueDate}</p>
      <p>Importance: ${importance}</p>
        <button class="btn task-edit">✎ Edit</button>
        <button class="btn task-delete">Delete</button>
    </article>`,
  );
}

document.addEventListener('click', (event) => {
  // console.log(`classList: ${event.target.classList}`);
  if (event.target.classList.contains('task-delete')) {
    console.log(`delete ${event.target} now`);
    deleteTask(event);
  }
});

document.addEventListener('click', (event) => {
  // console.log(`classList: ${event.target.classList}`);
  if (event.target.classList.contains('task-complete')) {
    completeTask(event);
  }
});

createTaskButton.addEventListener('click', () => {
  taskDialog.showModal();
});

// Prevent the "confirm" button from the default behavior of submitting the form,
// and close the dialog with the `close()` method, which triggers the "close" event.
confirmButton.addEventListener('click', (e) => {
  e.preventDefault();
  createTask();
  addATask();
  taskDialog.close();
  clearDialog();
});

// Prevent the "cancel" button from the default behavior of submitting the form,
// and close the dialog with the `close()` method, which triggers the "close" event.
cancelButton.addEventListener('click', (e) => {
  e.preventDefault();
  // console.log('close dialog');
  taskDialog.close();
  clearDialog();
});
