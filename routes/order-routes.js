import express from 'express';

const router = express.Router();
import {taskController} from '../controller/tasks-controller.js';

router.get("/", taskController.getAllTasks);
router.post("/", taskController.addTask);
router.get("/:id/", taskController.showTask);
router.delete("/:id/", taskController.deleteTask);

export const orderRoutes = router;
