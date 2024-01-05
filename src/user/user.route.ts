import IRoute from "../shared/IRoute.shared";
import { Router } from "express";
import AdminController from "./controller/admin/admin.controller";
import StudentController from "./controller/student/student.controller";
import verifyAccessToken from "../shared/admin.middleware";

export default class UserRoute implements IRoute {
  public router: Router = Router();
  public path: string = "/users";
  private adminController: AdminController;
  private studentController: StudentController;

  constructor() {
    this.adminController = new AdminController();
    this.studentController = new StudentController();
    this.initRoutes();
  }

  private initRoutes = () => {
    this.router.post(
      `${this.path}/student/login`,
      this.studentController.login
    );
    this.router.post(`${this.path}/admin/login`, this.adminController.login);
    this.router.post(
      `${this.path}/admin/dashboard/students`,
      verifyAccessToken,
      this.adminController.addStudent
    );

    this.router.get(
      `${this.path}/admin/dashboard/students`,
      verifyAccessToken,
      this.adminController.getStudents
    );
  };
}
