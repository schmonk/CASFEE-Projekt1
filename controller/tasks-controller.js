import { taskStore } from "../services/task-store.js";

export class TaskController {
  getAllTasks = async (req, res) => {
    // console.dir(req.params.sortingType, req.params.ascendingTrue || [] );
    res.json(await taskStore.all());
  };

  addTask = async (req, res) => {
    res.json(
      await taskStore.add(
        req.body.title,
        req.body.description,
        req.body.dueDate,
        req.body.creationDate,
        req.body.completion,
        req.body.importance
      )
    );
  };

  updateTask = async (req, res) => {
    console.log(`req is: ${req}`);
    console.log(`update task from the task controller, ID: ${req.params.id}`);
    res.json(await taskStore.update(req.params.id));
  };

  showTask = async (req, res) => {
    res.json(await taskStore.get(req.params.id));
  };

  deleteTask = async (req, res) => {
    console.log("beep deleteTask called");
    console.log(`the req param ID is = ${req.params.id}`);
    res.json(await taskStore.delete(req.params.id)); // TODO should return 402 if not ok
  };
}

export const tasksController = new TaskController();
