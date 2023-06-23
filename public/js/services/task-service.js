import { httpService } from './http-service.js'

class TaskService {
    async addTask(task) {
        return httpService.ajax("POST", "/tasks/", { title: task.title, description: task.description, dueDate: task.dueDate, creationDate: task.creationDate, completion: task.completion });
    }
    
    async getAllTasks() {
        // console.log('get all tasks');
        return httpService.ajax("GET", "/tasks/", undefined);
    }

    async updateTask(id) {
        console.log(`get task with id: ${id}`);
        return httpService.ajax("POST", `/tasks/${id}`, undefined);
    }

    async getTask(id) {
        console.log(`get task with id: ${id}`);
        return httpService.ajax("GET", `/tasks/${id}`, undefined);
    }

    async deleteTask(id) {
        console.log(`Task service: DEL task w/ ID: ${id}`);
        console.log(`HTTPService: ${httpService.ajax("DELETE", `/tasks/${id}`, undefined)}`);
        return httpService.ajax("DELETE", `/tasks/${id}`, undefined);
    }
}

export const taskService = new TaskService();
