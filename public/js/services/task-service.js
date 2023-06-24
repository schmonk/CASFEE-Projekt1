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

  async getAllTasks(sortingType, ascendingTrue, filteringTrue) {
    // console.log("TService: get all tasks");
    /*     console.log(
      // `TService sort by ${sortingType} with ASC: ${ascendingTrue} and filter: ${filteringTrue}`
    ); */
    return httpService.ajax(
      "GET",
      `/tasks/sortingFiltering?sortingType=${sortingType}&ascendingTrue=${ascendingTrue}&filteringTrue=${filteringTrue}`,
      undefined
    );
  }

  async getTask(id) {
    // console.log(`TService:  get task, id: ${id}`);
    return httpService.ajax("GET", `/tasks/${id}`, undefined);
  }

  async updateTask(id, title, description, dueDate, creationDate, completion, importance) {
    return httpService.ajax("POST", `/tasks/${id}`, {
      title,
      description,
      dueDate,
      creationDate,
      completion,
      importance,
    });
  }

  async deleteTask(id) {
    // console.log(`TService: DEL task w/ ID: ${id}`);
    return httpService.ajax("DELETE", `/tasks/${id}`, undefined);
  }
}

export const taskService = new TaskService();
