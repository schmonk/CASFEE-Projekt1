import express from "express";

const router = express.Router();
import { tasksController } from "../controller/tasks-controller.js";

router.get("/sortingFiltering", tasksController.getAllTasks);
router.post("/", tasksController.addTask);
router.get("/:id/", tasksController.showTask);
router.post("/:id/", tasksController.updateTask);
router.delete("/:id/", tasksController.deleteTask);

export const taskRoutes = router;
