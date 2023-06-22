import { httpService } from './http-service.js'

class TaskService {
    async addTask(task) {
        return httpService.ajax("POST", "/tasks/", { title: task.title, description: task.description, dueDate: task.dueDate, creationDate: task.creationDate, completion: task.completion });
    }
    
    async getAllTasks() {
        console.log('get all tasks');
        return httpService.ajax("GET", "/tasks/", undefined);
    }

    async getTask(id) {
        return httpService.ajax("GET", `/tasks/${id}`, undefined);
    }

    async deleteTask(id) {
        return httpService.ajax("DELETE", `/tasks/${id}`, undefined);
    }
}

export const taskService = new TaskService();
