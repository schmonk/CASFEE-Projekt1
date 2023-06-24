import tm from "./task-manager.js";
import { taskService } from "../services/task-service.js";
import { clamp } from "../services/utils.js";
// import { sortTasks } from "../services/utils.js";

const taskDialog = document.querySelector(".taskDialog");
const taskList = document.querySelector(".task-list");
const taskTitle = document.querySelector("#taskTitle");
const taskImportance = document.querySelector("#taskImportance");
const taskDueDate = document.querySelector("#taskDueDate");
const taskDescription = document.querySelector("#taskDescription");
const taskCompletion = document.querySelector("#taskCompletion");
const filterCompletedButton = document.querySelector(".filter-button");
const filterSortContainer = document.querySelector(".filterSort-container");
const placeholderTaskTitle = "My task";
const placeholderTaskDescription = "Task description";

function insertImportanceStars(amount) {
  let stars = "";
  for (let i = 0; i < amount; i += 1) {
    stars += "&#9733";
  }
  return stars;
}

function createTaskHTML(task) {
  let hiddenString = "completed";
  if (filterCompletedButton.classList.contains("filtering-active")) {
    hiddenString = "completed hidden";
  }
  return `<article data-id="${task._id}" class="task-container ${
    task.completion ? hiddenString : ""
  }">
    <input type="checkbox" name="completion" class="task-completion" ${
      task.completion ? "checked" : ""
    }/>
    <div class="task-content">
      <h3 class="task-title">${task.title}</h3>
      <p class="task-description">${task.description}</p>
    </div>
    <p class="task-due-date">Due ${task.dueDate}</p>
    <p class="task-created-date" >Created ${task.creationDate}</p>
    <p ><span class="task-importance">${insertImportanceStars(task.importance)}</span></p>
    <div class="buttongroup">
    <button class="btn task-delete">Delete</button>
    <button class="btn task-edit">Edit</button>
    </div>
    </article>`;
}

function addTaskToDOM(task) {
  taskList.insertAdjacentHTML("beforeend", createTaskHTML(task));
}

async function renderTasks(sortingType = "importance", asceningTrue = true, filteringTrue = false) {
  console.log(`renderTask: type: ${sortingType}, ASC: ${asceningTrue}, FILTER: ${filteringTrue}`);
  const sortedTaskArray = await taskService.getAllTasks(sortingType, asceningTrue, filteringTrue);
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  for (let i = 0; i < sortedTaskArray.length; i += 1) {
    addTaskToDOM(sortedTaskArray[i]);
  }
}

function createId() {
  return `${Date.now().toString()}`;
}

function formatDate(date, isForDisplay) {
  const dateFormatOptions = { day: "numeric", month: "numeric", year: "numeric" };
  const dateDisplayFormat = new Intl.DateTimeFormat("de-CH", dateFormatOptions);
  const datePickerFormat = new Intl.DateTimeFormat("en-US", dateFormatOptions);
  const dateFormat = isForDisplay ? dateDisplayFormat : datePickerFormat;
  return dateFormat.format(date);
}

function createCreationDate() {
  const today = Date.now();
  return formatDate(today, true);
}

function createDefaultDueDate() {
  const days = 7; // how many days in the future is the default due date?
  const date = new Date();
  date.setDate(date.getDate() + days);
  return formatDate(date, true);
}

function createTask(e) {
  e.preventDefault();
  const newTask = {
    id: createId(),
    title: taskTitle.value ? taskTitle.value : placeholderTaskTitle,
    dueDate: taskDueDate.value ? taskDueDate.value : createDefaultDueDate(),
    creationDate: createCreationDate(),
    description: taskDescription.value ? taskDescription.value : placeholderTaskDescription,
    importance: taskImportance.value ? clamp(taskImportance.value, 1, 5) : "3",
    completion: taskCompletion.checked,
  };
  return newTask;
}
function updateTask(event) {
  event.preventDefault();
  taskDialog.querySelector("#saveDialogButton").classList.remove("task-update");

  const task = {
    id: taskDialog.dataset.id,
    title: taskTitle.value,
    importance: taskImportance.value,
    description: taskDescription.value,
    completion: taskCompletion.checked,
    dueDate: taskDueDate.value, // does not work yet
  };
  return task;
}

function updateToggleView(taskContainer) {
  taskContainer.classList.toggle("completed");
}

async function toggleCOmpletionControl(event) {
  const taskContainer = event.target.parentElement;
  updateToggleView(taskContainer);
  const currentId = taskContainer.dataset.id.toString();
  // console.log(`toggle completion on ID : ${currentId}`);
  const existingTask = await taskService.getTask(currentId);
  taskCompletion.checked = existingTask.completion;

  await taskService.updateTask(
    currentId,
    existingTask.title,
    existingTask.description,
    existingTask.dueDate,
    existingTask.creationDate,
    (existingTask.completion = !existingTask.completion),
    existingTask.importance
  );

  renderTasks();
}

function clearDialog() {
  taskTitle.value = "";
  taskDueDate.value = "";
  taskDescription.value = "";
  taskImportance.value = "";
  taskCompletion.checked = false;
}
function setupEditDialog(title) {
  taskDialog.querySelector("h2").textContent = `Edit "${title}"`;
  taskDialog.querySelector("#saveDialogButton").textContent = "Update";
  taskDialog.querySelector("#saveDialogButton").classList.add("task-update");
  taskDialog.querySelector("#saveDialogButton").classList.remove("task-create");
}

function setupCreationDialog() {
  taskDialog.querySelector("h2").textContent = "Create a task";
  taskDialog.querySelector("#saveDialogButton").textContent = "Create";
  taskDialog.querySelector("#taskImportance").value = 3;
  // taskDialog.querySelector('#taskDueDate').valueAsDate = new Date();
  taskDialog.querySelector("#saveDialogButton").classList.add("task-create");
  taskDialog.querySelector("#saveDialogButton").classList.remove("task-update");
}

async function openEditDialog(event) {
  const taskContainer = event.target.parentElement.parentElement;
  const currentId = taskContainer.dataset.id.toString();
  const existingTask = await taskService.getTask(currentId);
  taskDialog.dataset.id = currentId;
  taskTitle.value = existingTask.title;
  taskImportance.value = existingTask.importance;
  taskDescription.value = existingTask.description;
  taskCompletion.checked = existingTask.completion;
  taskDueDate.value = `${existingTask.dueDate}`; // does not work yet
  setupEditDialog(existingTask.title);
  taskDialog.showModal();
}

function toggleSortingButtons(keepOnClass) {
  const sortingButtons = document.querySelectorAll(".sort-button");
  let sortingDirection = 0;
  for (let i = 0; i < sortingButtons.length; i += 1) {
    if (!sortingButtons[i].classList.contains(keepOnClass)) {
      sortingButtons[i].classList.remove("sorting-active");
      sortingButtons[i].classList.remove("ascending");
      sortingButtons[i].classList.remove("descending");
    } else {
      sortingButtons[i].classList.add("sorting-active");
      if (sortingButtons[i].classList.contains("ascending")) {
        sortingButtons[i].classList.remove("ascending");
        sortingButtons[i].classList.add("descending");
        sortingDirection = 1;
      } else {
        sortingButtons[i].classList.remove("descending");
        sortingButtons[i].classList.add("ascending");
        sortingDirection = 0;
      }
    }
  }
  return sortingDirection;
}

function toggleSortingDirection(keepOnClass, ascendingState) {
  const sortingButtons = document.querySelectorAll(".sort-button");
  for (let i = 0; i < sortingButtons.length; i += 1) {
    if (sortingButtons[i].classList.contains("sorting-active") && ascendingState) {
      sortingButtons[i].classList.remove("ascending");
      sortingButtons[i].classList.add("descending");
    } else if (sortingButtons[i].classList.contains("sorting-active") && !ascendingState) {
      sortingButtons[i].classList.remove("descending");
      sortingButtons[i].classList.add("ascending");
    }
  }
}

document.addEventListener("click", async (event) => {
  const myCL = event.target.classList;
  const taskContainer = event.target.parentElement.parentElement;
  switch (true) {
    case myCL.contains("task-add"):
      setupCreationDialog();
      taskDialog.showModal();
      break;
    case myCL.contains("task-delete"):
      // deleteTask(event);
      await taskService.deleteTask(taskContainer.dataset.id);
      renderTasks();
      break;
    case myCL.contains("cancel"):
      taskDialog.close();
      clearDialog();
      break;
    case myCL.contains("task-update"):
      console.log(`update task with ID: ${taskDialog.dataset.id}`);
      const taskToUpdate = updateTask(event);
      await taskService.updateTask(
        taskDialog.dataset.id,
        taskToUpdate.title,
        taskToUpdate.description,
        taskToUpdate.dueDate,
        taskToUpdate.creationDate,
        taskToUpdate.completion,
        taskToUpdate.importance
      );
      renderTasks();
      taskDialog.close();
      clearDialog();
      break;
    case myCL.contains("task-edit"):
      openEditDialog(event);
      break;
    case myCL.contains("task-completion"):
      toggleCOmpletionControl(event);
      // await taskService.updateTask();
      renderTasks();
      break;
    case myCL.contains("task-create"):
      const taskToCreate = createTask(event);
      await taskService.addTask(taskToCreate);
      taskDialog.close();
      clearDialog();
      renderTasks();
      break;
    default:
      break;
  }
});

filterSortContainer.addEventListener("click", (event) => {
  event.preventDefault();
  switch (event.target.dataset.id) {
    case "filterCompleted":
      console.log("filterCompleted");
      renderTasks(undefined, undefined, true);
      break;
    case "sortName": {
      console.log("sortName");

      break;
    }
    case "sortDueDate": {
      console.log("sortDueDate");
      renderTasks("dueDate", undefined, undefined);
      break;
    }
    case "sortCreationDate": {
      console.log("sortCreationDate");
      renderTasks("creationDate", undefined, undefined);
      break;
    }
    case "sortImportance": {
      console.log("sortImportance");
      renderTasks("importance", undefined, undefined);
      break;
    }
    default:
      break;
  }
});

document.addEventListener("DOMContentLoaded", async (event) => {
  renderTasks();
});
