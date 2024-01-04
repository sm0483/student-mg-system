import App from "./app";
import UserRoute from "./user/user.route";
import TaskRoute from "./task/task.route";

const app = new App([
    new UserRoute(),
    new TaskRoute()
]);

app.listen();

export default app.getApp();