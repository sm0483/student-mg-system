import IRoute from "../shared/IRoute.shared";
import { Router } from "express";
import TaskController from "./controller/task.controller";
import verifyAccessToken from "@/shared/token.middleware";


export default class TaskRoute implements IRoute {
  public router: Router = Router();
  public path: string = "/tasks";
  private adminController:TaskController;

  constructor() {
    this.adminController=new TaskController();
    this.initRoutes();
  }

  private initRoutes = () => {
    this.router.get(`${this.path}/google`, );

  };
}