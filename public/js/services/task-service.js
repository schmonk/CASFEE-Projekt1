import { httpService } from './http-service.js'

class TaskService {
    async addTask(title, description, dueDate, creationDate, completion ) {
        console.log('received task');
        return httpService.ajax("POST", "/tasks/", { title: title, description: description, dueDate: dueDate, creationDate: creationDate, completion: completion });
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
