import { taskStore } from "../services/task-store.js";

export class TaskController {
  getAllTasks = async (req, res) => {
    // console.dir(req.params.sortingType, req.params.ascendingTrue || [] );
    /*     console.log(`TaskController: Query${req.query}, BODY: ${req.body}, PARAMS: ${req.params}`);
    console.dir(req); */
    res.json(
      await taskStore.all(req.query.sortingType, req.query.ascendingTrue, req.query.filteringTrue)
    );
  };

  addTask = async (req, res) => {
    // TODO: check in the request that values are valid
    let importance = req.body.importance;
    if (importance > 5) {
      console.log("importance was bigger than 5, clamping that cochonne now!! 🔐 ");
      importance = 5;
    }
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
    /*     console.log(`req Params ID: ${req.params.id}`);
    console.log(`req body title: ${req.body.title}`); */
    res.json(
      await taskStore.update(
        req.params.id,
        req.body.title,
        req.body.description,
        req.body.dueDate,
        req.body.creationDate,
        req.body.completion,
        req.body.importance
      )
    );
  };

  showTask = async (req, res) => {
    res.json(await taskStore.get(req.params.id));
  };

  deleteTask = async (req, res) => {
    // console.log("beep deleteTask called");
    // console.log(`the req param ID is = ${req.params.id}`);
    res.json(await taskStore.delete(req.params.id)); // TODO should return 402 if not ok
  };
}

export const tasksController = new TaskController();
