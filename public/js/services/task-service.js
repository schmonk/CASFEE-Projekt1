import { httpService } from './http-service.js';

class TaskService {
  async addTask(task) {
    return httpService.ajax('POST', '/tasks/', {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      creationDate: task.creationDate,
      completion: task.completion,
      importance: task.importance,
    });
  }

  async getAllTasks() {
    console.log('TS: get all tasks');
    return httpService.ajax('GET', '/tasks/', undefined);
  }

  async getTask(id) {
    console.log(`TS:  get task with id: ${id}`);
    return httpService.ajax('GET', `/tasks/${id}`, undefined);
  }

  async updateTask(id, task) {
    console.log(`TS: update task with id: ${id}`);
    return httpService.ajax('POST', `/tasks/${id}`, {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      creationDate: task.creationDate,
      completion: task.completion,
      importance: task.importance,
    });
  }

  async deleteTask(id) {
    console.log(`TS: DEL task w/ ID: ${id}`);
    return httpService.ajax('DELETE', `/tasks/${id}`, undefined);
  }
}

export const taskService = new TaskService();
