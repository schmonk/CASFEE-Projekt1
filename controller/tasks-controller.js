import { taskStore } from "../services/task-store.js";
import { clamp } from "../public//js/services/utils.js";

export class TaskController {
  getAllTasks = async (req, res) => {
    res.json(await taskStore.all(req.query.sortingType, req.query.ascending, req.query.filtering));
  };

  addTask = async (req, res) => {
    let importance = clamp(req.body.importance, 1, 5);
    res.json(
      await taskStore.add(
        req.body.title,
        req.body.description,
        req.body.dueDate,
        req.body.creationDate,
        req.body.completion,
        importance
      )
    );
  };

  updateTask = async (req, res) => {
    let importance = clamp(req.body.importance, 1, 5);
    res.json(
      await taskStore.update(
        req.params.id,
        req.body.title,
        req.body.description,
        req.body.dueDate,
        req.body.creationDate,
        req.body.completion,
        importance
      )
    );
  };

  showTask = async (req, res) => {
    res.json(await taskStore.get(req.params.id));
  };

  deleteTask = async (req, res) => {
    res.json(await taskStore.delete(req.params.id)); // TODO should return 402 if not ok
  };
}

export const tasksController = new TaskController();
