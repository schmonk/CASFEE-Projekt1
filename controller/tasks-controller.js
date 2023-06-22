import {taskStore} from '../services/task-store.js'

export class TaskController {

    getAllTasks = async (req, res) => {
        res.json((await taskStore.all()))
    };

    addTask = async (req, res) => {
        console.log('task controller adds task');
        res.json(await taskStore.add(req.body.name));
    };

    showTask = async (req, res) => {
        res.json(await taskStore.get(req.params.id));
    };

    deleteTask = async (req, res) => {
        res.json(await taskStore.delete(req.params.id)); // TODO should return 402 if not ok
    };
}

export const tasksController = new TaskController();
