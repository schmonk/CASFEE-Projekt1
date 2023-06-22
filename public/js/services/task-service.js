import { httpService } from './http-service.js'

class TaskService {
    async addTask(/* task */) {
        console.log('test');
        return httpService.ajax("POST", "/tasks/", { task });
    }

    async getAllTasks() {
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
