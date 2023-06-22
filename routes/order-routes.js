import express from 'express';

const router = express.Router();
import {tasksController} from '../controller/tasks-controller.js';

router.get("/", tasksController.getAllTasks);
router.post("/", tasksController.addTask);
router.get("/:id/", tasksController.showTask);
router.delete("/:id/", tasksController.deleteTask);

export const orderRoutes = router;
