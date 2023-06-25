// import tm from "./task-manager.js";
import { taskService } from "../services/task-service.js";
import { clamp } from "../services/utils.js";
import { valueStorage } from "./storage-manager.js";

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
const lsSettingsKey = "Settings";

function generateStars(amount) {
  let stars = "";
  for (let i = 0; i < amount; i += 1) {
    stars += "&#9733";
  }
  return stars;
}

function createTaskHTML(task) {
  let convertedDueDate = convertMSToDateString(task.dueDate);
  let convertedCreationDate = convertMSToDateString(task.creationDate);

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
    <p class="task-due-date">Due ${convertedDueDate}</p>
    <p class="task-created-date" >Created ${convertedCreationDate}</p>
    <p ><span class="task-importance">${generateStars(task.importance)}</span></p>
    <div class="buttongroup">
    <button class="btn task-delete">Delete</button>
    <button class="btn task-edit">Edit</button>
    </div>
    </article>`;
}

function addTaskToDOM(task) {
  taskList.insertAdjacentHTML("beforeend", createTaskHTML(task));
}

function initlializeSettingsStorage() {
  const settings = {
    type: "creationDate",
    ascending: true,
    filtering: false,
  };
  valueStorage.setItem(lsSettingsKey, settings);
  return settings;
}

function renderFilterSortButtons(sortingType, ascending, filtering) {
  for (const child of filterSortContainer.children) {
    if (sortingType === child.dataset.filterSort) {
      // console.log("style this:", child.dataset.filterSort);
      child.classList.add("sorting-active");
      if (ascending === true) {
        child.classList.add("ascending");
        child.classList.remove("descending");
      } else if (ascending === false) {
        child.classList.add("descending");
        child.classList.remove("ascending");
      }
    } else {
      child.classList.remove("sorting-active");
      child.classList.remove("ascending");
      child.classList.remove("descending");
    }
    if (child.dataset.filterSort === "filter" && filtering === true) {
      child.classList.add("sorting-active");
    } else if (child.dataset.filterSort === "filter" && filtering === false) {
      child.classList.remove("sorting-active");
    }
  }
  // console.log("Style type:", sortingType, "ascending:", ascending, "filtering", filtering);
}

async function renderTasks(sortingType, ascending, filtering) {
  let storedSettings = valueStorage.getItem(lsSettingsKey);
  if (sortingType) {
    storedSettings.type = sortingType;
    valueStorage.setItem(lsSettingsKey, storedSettings);
  } else {
    if (storedSettings) {
      sortingType = storedSettings.type;
    } else {
      let settings = initlializeSettingsStorage();
      sortingType = settings.type;
    }
  }
  if (ascending === undefined) {
    if (storedSettings) {
      ascending = storedSettings.ascending;
    } else {
      let settings = initlializeSettingsStorage();
      ascending = settings.ascending;
    }
  } else {
    storedSettings.ascending = ascending;
    valueStorage.setItem(lsSettingsKey, storedSettings);
  }
  if (filtering === undefined) {
    if (storedSettings) {
      filtering = storedSettings.filtering;
    } else {
      let settings = initlializeSettingsStorage();
      filtering = settings.filtering;
    }
  } else {
    storedSettings.filtering = filtering;
    valueStorage.setItem(lsSettingsKey, storedSettings);
  }

  const sortedTaskArray = await taskService.getAllTasks(sortingType, ascending, filtering);
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  for (let i = 0; i < sortedTaskArray.length; i += 1) {
    addTaskToDOM(sortedTaskArray[i]);
  }
  renderFilterSortButtons(sortingType, ascending, filtering);
}

function convertDateToMS(date) {
  let convertedDate = new Date(date).getTime();
  console.log("convert to MS: ", convertedDate);
  return convertedDate;
}

function convertMSToDate(valueInMS) {
  let convertedValue = new Date(valueInMS);
  console.log("convert ms to this datestring: ", convertedValue);
  return convertedValue;
}

function convertMSToDateString(valueInMS) {
  let convertedValue = new Date(valueInMS).toDateString();
  // console.log("convert ms to this datestring: ", convertedValue);
  return convertedValue;
}

function convertMSForDatePicker(valueInMS) {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  let outPut = convertMSToDate(valueInMS).toLocaleDateString(undefined, options);
  // console.log("output for Date Picker: ", outPut, typeof outPut);
  // console.log(event.toLocaleDateString(undefined, options));
  return outPut;
}

function creationDate() {
  const today = new Date();
  const todayMS = today.getTime();
  return todayMS;
}

function createDefaultDueDate() {
  const days = 7; // how many days in the future is the default due date?
  const date = new Date();
  date.setDate(date.getDate() + days);
  const dateMS = date.getTime();
  return dateMS;
}

function createTask(e) {
  e.preventDefault();
  const newTask = {
    title: taskTitle.value ? taskTitle.value : placeholderTaskTitle,
    dueDate: taskDueDate.value ? taskDueDate.value : createDefaultDueDate(),
    creationDate: creationDate(),
    description: taskDescription.value ? taskDescription.value : placeholderTaskDescription,
    importance: taskImportance.value ? clamp(taskImportance.value, 1, 5) : "3",
    completion: taskCompletion.checked,
  };
  console.log(taskDueDate.value, "asfasdfafsd");
  return newTask;
}
async function updateTask(event) {
  event.preventDefault();
  taskDialog.querySelector("#saveDialogButton").classList.remove("task-update");
  const currentId = taskDialog.dataset.id.toString();
  const existingTask = await taskService.getTask(currentId);
  // console.log("existing task creation date:", existingTask.creationDate);
  const task = {
    id: taskDialog.dataset.id,
    title: taskTitle.value,
    description: taskDescription.value,
    dueDate: taskDueDate.value,
    creationDate: existingTask.creationDate, // does not work yet
    completion: taskCompletion.checked,
    importance: taskImportance.value,
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

  await renderTasks();
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
  taskDialog.querySelector("#taskDueDate").valueAsDate = new Date();
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
  taskDueDate.valueAsDate = convertMSToDate(existingTask.dueDate);
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
      await taskService.deleteTask(taskContainer.dataset.id);
      renderTasks();
      break;
    case myCL.contains("cancel"):
      taskDialog.close();
      clearDialog();
      break;
    case myCL.contains("task-update"):
      const taskToUpdate = await updateTask(event);
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

taskImportance.addEventListener("blur", (event) => {
  console.log("blur task importance");
  taskImportance.value = clamp(taskImportance.value, 1, 5);
});

filterSortContainer.addEventListener("click", (event) => {
  event.preventDefault();
  let targetDataSet = event.target.dataset;
  switch (targetDataSet.filterSort) {
    case "filter":
      event.target.dataset.filtering = event.target.dataset.filtering === "true" ? "false" : "true";
      let filtering = event.target.dataset.filtering === "true" ? true : false;
      renderTasks(undefined, undefined, filtering);
      break;
    case "title": {
      event.target.dataset.ascending = event.target.dataset.ascending === "true" ? "false" : "true";
      let ascending = event.target.dataset.ascending === "true" ? true : false;
      renderTasks("title", ascending, undefined);
      break;
    }
    case "dueDate": {
      event.target.dataset.ascending = event.target.dataset.ascending === "true" ? "false" : "true";
      let ascending = event.target.dataset.ascending === "true" ? true : false;
      renderTasks("dueDate", ascending, undefined);
      break;
    }
    case "creationDate": {
      event.target.dataset.ascending = event.target.dataset.ascending === "true" ? "false" : "true";
      let ascending = event.target.dataset.ascending === "true" ? true : false;
      renderTasks("creationDate", ascending, undefined);
      break;
    }
    case "importance": {
      event.target.dataset.ascending = event.target.dataset.ascending === "true" ? "false" : "true";
      let ascending = event.target.dataset.ascending === "true" ? true : false;
      renderTasks("importance", ascending, undefined);
      break;
    }
    default:
      break;
  }
});

document.addEventListener("DOMContentLoaded", async (event) => {
  renderTasks();
});
