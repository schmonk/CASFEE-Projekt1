import { httpService } from "./http-service.js";

class TaskService {
  async addTask(task) {
    return httpService.ajax("POST", "/tasks/", {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      creationDate: task.creationDate,
      completion: task.completion,
      importance: task.importance,
    });
  }

  async getAllTasks() {
    console.log("TS: get all tasks");
    return httpService.ajax("GET", "/tasks/", undefined);
  }

  async getTask(id) {
    console.log(`TS:  get task with id: ${id}`);
    return httpService.ajax("GET", `/tasks/${id}`, undefined);
  }

  async updateTask(id, title, description, dueDate, creationDate, completion, importance) {
    // console.log(`TS: update task with id: ${id}`);
    console.log(`TService: update task: ${id}`);
    /*     console.log(
      `TS: update task: ${(id, title, description, dueDate, creationDate, completion, importance)}`
    ); */
    return httpService.ajax("POST", `/tasks/${id}`, undefined);
  }

  async deleteTask(id) {
    console.log(`TS: DEL task w/ ID: ${id}`);
    return httpService.ajax("DELETE", `/tasks/${id}`, undefined);
  }
}

export const taskService = new TaskService();
