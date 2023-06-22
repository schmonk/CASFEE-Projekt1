import { httpService } from './http-service.js'

class TaskService {
    async addTask(taskTitle, taskDescription, taskDueDate, taskCreationDate, taskCompletion ) {
        console.log('received task');
        return httpService.ajax("POST", "/tasks/", { title: taskTitle, description: taskDescription, dueDate: taskDueDate, creationDate: taskCreationDate, completion: taskCompletion });
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
