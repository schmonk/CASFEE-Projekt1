const createTaskButton = document.querySelector('#createTaskButton');
const taskDialog = document.querySelector('#taskDialog');
const cancelButton = document.querySelector('#cancelButton');
const deleteButton = document.querySelector('.task-delete');
const taskList = document.querySelector('.task-list');
const taskTitle = document.querySelector('#taskTitle');
const taskImportance = document.querySelector('#taskImportance');
const taskDueDate = document.querySelector('#taskDueDate');
const taskDescription = document.querySelector('#taskDescription');
const localStorageKey = 'myTasks';
const tasks = [];

console.log(localStorageKey);

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
  const retrievedTask = localStorage.getItem(element.id.toString());
  // currentEditId = element.id.toString();
  const parsedTask = JSON.parse(retrievedTask);
  taskTitle.value = parsedTask.title;
  taskImportance.value = parsedTask.importance;
  taskDescription.value = parsedTask.description;
  taskDialog.classList.add(`${currentId}`);
  taskDialog.querySelector('h2').textContent = `Edit "${taskTitle.value}"`;
  taskDialog.querySelector('#saveDialogButton').textContent = 'Update';
  taskDialog.querySelector('#saveDialogButton').classList.add('task-update');
  taskDialog.querySelector('#saveDialogButton').classList.remove('task-create');
  taskDialog.showModal();
}
function updateTask() {
  const title = (taskTitle.value !== '') ? taskTitle.value : 'My Task Title';
  const dueDate = (taskDueDate.value !== '') ? taskDueDate.value : 'today';
  const description = (taskDescription.value !== '') ? taskDescription.value : '';
  let importance = (taskImportance.value !== '') ? taskImportance.value : '3';
  importance = importance < 0 ? 0 : importance;
  importance = importance > 5 ? 5 : importance;
  const id = taskDialog.classList;
  const newTask = {
    id,
    title,
    dueDate,
    description,
    importance,
  };
  const element = taskList.querySelector(`#${id}`);
  element.querySelector('.task-title').textContent = title;
  element.querySelector('.task-description').textContent = description;
  element.querySelector('.task-importance').textContent = importance;
  element.querySelector('.task-due-date').textContent = `Due ${dueDate}`;
  element.querySelector('.task-created-date').textContent = `Created ${dueDate}`;
  const indexToUpdate = tasks.indexOf(findObject(tasks, 'id', element.id.toString()));
  console.log(`update this ID: ${indexToUpdate}`);
  localStorage.setItem(`${id}`, JSON.stringify(newTask));
}

function createId() {
  // the id shouldnt start with a number so we can retrieve it with querySelector in updateTask()
  // https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers
  return `z${Date.now().toString()}`;
}

function createTask() {
  const id = createId();
  const title = (taskTitle.value !== '') ? taskTitle.value : 'My Task Title';
  const dueDate = (taskDueDate.value !== '') ? taskDueDate.value : 'today';
  const tempD = new Date();
  const creationDate = `${tempD.getUTCDate()}.${tempD.getUTCMonth()}.${tempD.getUTCFullYear()}`;
  const description = (taskDescription.value !== '') ? taskDescription.value : '';
  let importance = (taskImportance.value !== '') ? taskImportance.value : '3';
  importance = importance < 0 ? 0 : importance;
  importance = importance > 5 ? 5 : importance;
  const newTask = {
    id,
    title,
    dueDate,
    creationDate,
    description,
    importance,
  };
  taskList.insertAdjacentHTML(
    'beforeend',
    `<article id="${newTask.id}" class="task-container">
    <input type="checkbox" name="completion" class="taskCheckbox" />
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
  console.log(tasks);
  localStorage.setItem(`${id}`, JSON.stringify(newTask));
}

function deleteTask(event) {
  if (event.target.classList.contains('task-delete')) {
    event.preventDefault();
    const element = event.target.parentElement.parentElement;
    const indexToremove = tasks.indexOf(findObject(tasks, 'id', element.id.toString()));
    tasks.splice(indexToremove, 1);
    localStorage.removeItem(element.id.toString());
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
  // event.preventDefault();
  if (event.target.classList.contains('task-create') && !event.target.classList.contains('task-update')) {
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

function renderTask(key) {
  const retrievedTask = localStorage.getItem(key.toString());
  const parsedTask = JSON.parse(retrievedTask);
  taskList.insertAdjacentHTML(
    'beforeend',
    `<article id="${parsedTask.id}" class="task-container">
      <input type="checkbox" name="completion" class="taskCheckbox" />
      <div class="task-content">
      <h3 class="task-title">${parsedTask.title}</h3>
      <p class="task-description">${parsedTask.description}</p>
      </div>
      <p class="task-due-date">Due ${parsedTask.dueDate}</p>
      <p class="task-created-date" >Created ${parsedTask.dueDate}</p>
      <p >Importance: <span class="task-importance">${parsedTask.importance}</span></p>
      <div class="buttongroup">
      <button class="btn task-delete">Delete</button>
      <button class="btn task-edit">Edit</button>
      </div>
      </article>`,
  );
}

function loopExistingLocalStorageKeys() {
  for (let i = 0; i < localStorage.length; i += 1) {
    const myKey = localStorage.key(i);
    if (myKey.toString().at(0) === 'z') {
      renderTask((myKey));
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loopExistingLocalStorageKeys();
});
