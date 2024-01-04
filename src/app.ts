import express from "express";
import IRoute from "./shared/IRoute.shared";
import dotenv from "dotenv";
import connectDb from "./config/db.config";
dotenv.config();
import cors from "cors";
import "express-async-errors";

import errorHandler from "./shared/errorHandler";
import pageNotFound from "./shared/notfound";

class App {
  public app: express.Application;
  public start: string;
  public port: number;

  constructor(routes: IRoute[]) {
    this.start = "/api/v1";
    this.app = express();
    this.initDb();
    this.initMiddleware();
    this.initRoutes(routes);
    this.port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    this.initErrorHandler();
  }

  private initMiddleware = () => {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: process.env.APP_URL,
        credentials: true,
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "UPDATE"],
      }),
    );
  };

  private initRoutes = (routes: IRoute[]) => {
    routes.forEach((route) => {
      this.app.use(this.start, route.router);
    });
  };

  private initErrorHandler = () => {
    this.app.use(pageNotFound);
    this.app.use(errorHandler);
  };

  private initDb = async () => {
    await connectDb();
  };

  public listen = () => {
    this.app.listen(this.port, () => {
      console.log(`connected to port ${this.port}`);
    });
  };

  public getApp = () => {
    return this.app;
  };
}

export default App;