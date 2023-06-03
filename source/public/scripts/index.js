console.log('Hello World');
const createButton = document.querySelector('#createButton');
const taskDialog = document.querySelector('#taskDialog');
const confirmButton = taskDialog.querySelector('#confirmButton');
const cancelButton = taskDialog.querySelector('#cancelButton');

// "Show the dialog" button opens the <dialog> modally
createButton.addEventListener('click', () => {
  taskDialog.showModal();
  console.log('show dialog');
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmButton.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('close dialog');
  taskDialog.close(); // Have to send the select box value here.
});
