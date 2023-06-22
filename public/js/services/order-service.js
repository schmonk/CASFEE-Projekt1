import { httpService } from './http-service.js'

class TaskService {
    async createTask(pizzeName) {
        return httpService.ajax("POST", "/orders/", { name: pizzeName });
    }

    async getAllTasks() {
        return httpService.ajax("GET", "/orders/", undefined);
    }

    async getTask(id) {
        return httpService.ajax("GET", `/orders/${id}`, undefined);
    }

    async deleteTask(id) {
        return httpService.ajax("DELETE", `/orders/${id}`, undefined);
    }
}

export const taskService = new TaskService();
