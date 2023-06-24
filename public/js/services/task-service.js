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

  async getAllTasks(sortingType, ascending, filtering) {
    return httpService.ajax(
      "GET",
      `/tasks/sortingFiltering?sortingType=${sortingType}&ascending=${ascending}&filtering=${filtering}`,
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
    return httpService.ajax("DELETE", `/tasks/${id}`, undefined);
  }
}

export const taskService = new TaskService();
