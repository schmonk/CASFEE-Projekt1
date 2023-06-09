const createTaskButton = document.querySelector('#createTaskButton');
const taskDialog = document.querySelector('#taskDialog');
const confirmButton = taskDialog.querySelector('#createDialogButton');
const cancelButton = document.querySelector('#cancelButton');
const taskList = document.querySelector('.task-list');
function createTask() {
  // console.log('create a task');
  // const newTask = document.createElement('article');
  // newTask.innerHTML =
  // newTask.textContent = 'this is a test';
  taskList.insertAdjacentHTML(
    'beforeend',
    `<article class="task-container">
  <div class="task-content">
    <button>Complete</button>
    <h3>Example task name</h3>
    <p>example notes for this task</p>
    <p>in 7 days</p>
    <p>Importance: 4/5</p>
  </div>
  <div class="task-edit">
    <button>✎ Edit</button>
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
