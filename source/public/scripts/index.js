const createTaskButton = document.querySelector('#createTaskButton');
const taskDialog = document.querySelector('#taskDialog');
const confirmButton = taskDialog.querySelector('#createDialogButton');
const cancelButton = document.querySelector('#cancelButton');
const taskList = document.querySelector('.task-list');
// const deleteButton = document.querySelector('')
const taskTitle = document.querySelector('#taskTitle');
const taskImportance = document.querySelector('#taskImportance');
const taskDueDate = document.querySelector('#taskDueDate');
const taskCompletion = document.querySelector('#taskCompletion');
const taskDescription = document.querySelector('#taskDescription');

function createTask() {
  const title = (taskTitle.value !== '') ? taskTitle.value : 'My Task Title';
  const dueDate = (taskDueDate.value !== null) ? taskDueDate.value : 'Today';
  const description = (taskDescription.value !== null) ? taskDescription.value : '';
  const importance = (taskImportance.value !== null) ? taskImportance.value : '';
  taskList.insertAdjacentHTML(
    'beforeend',
    `<article class="task-container">
  <div class="task-content">
    <button>Complete</button>
    <h3>${title}</h3>
    <p>${description}</p>
    <p>Due ${dueDate}</p>
    <p>Importance: ${importance}</p>
  </div>
  <div class="task-edit">
    <button>✎ Edit</button>
  </div>
  <div class="btn task-delete">
  <button>Delete</button>
</div>
</article>`,
  );
}
// "Show the dialog" button opens the <dialog> modally
createTaskButton.addEventListener('click', () => {
  taskDialog.showModal();
});

// Prevent the "confirm" button from the default behavior of submitting the form,
// and close the dialog with the `close()` method, which triggers the "close" event.
confirmButton.addEventListener('click', (e) => {
  e.preventDefault();
  createTask();
  taskDialog.close();
});

// Prevent the "cancel" button from the default behavior of submitting the form,
// and close the dialog with the `close()` method, which triggers the "close" event.
cancelButton.addEventListener('click', (e) => {
  e.preventDefault();
  // console.log('close dialog');
  taskDialog.close();
});
