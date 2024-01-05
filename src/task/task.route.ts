import IRoute from "../shared/IRoute.shared";
import { Router } from "express";
import TaskController from "./controller/task.controller";
import verifyAccessTokenAdmin from "../shared/admin.middleware";
import verifyAccessTokenStudent from "../shared/token.middleware";

export default class TaskRoute implements IRoute {
  public router: Router = Router();
  public path: string = "/tasks";
  private taskController: TaskController;

  constructor() {
    this.taskController = new TaskController();
    this.initRoutes();
  }

  private initRoutes = () => {
    this.router.post(
      `/admin/tasks`,
      verifyAccessTokenAdmin,
      this.taskController.createTask
    );
    this.router.get(
      `/students/tasks`,
      verifyAccessTokenStudent,
      this.taskController.getAllTasks
    );
    this.router.put(
      `/admin/tasks/:taskId`,
      verifyAccessTokenStudent,
      this.taskController.editTask
    );
  };
}
