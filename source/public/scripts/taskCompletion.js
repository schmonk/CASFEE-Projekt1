function toggleCompletion(event) {
  const taskContainer = event.target.parentElement;
  taskContainer.classList.toggle('completed');
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('taskCheckbox')) {
    toggleCompletion(event);
  }
});
