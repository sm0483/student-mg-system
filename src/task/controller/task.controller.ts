import { Request, Response } from "express";
import TaskModel from "../models/task.model";
import TaskValidator from "../validator/task.validator";
import CustomError from "../../shared/customError";
import { StatusCodes } from "http-status-codes";
import StudentModel from "../../user/models/student.model";
import TaskValidatorUpdate from "../validator/updateTask.validator";

export default class TaskController {
  private taskValidator: TaskValidator = new TaskValidator();
  private taskValidatorUpdate: TaskValidatorUpdate = new TaskValidatorUpdate();
  public createTask = async (req: Request, res: Response) => {
    const error = this.taskValidator.validate(req.body);
    if (error) throw new CustomError(error, StatusCodes.BAD_REQUEST);

    const assignedTo= req.body.assignedTo;
    const isStudentPresent=await StudentModel.findById(assignedTo);
    if(!isStudentPresent) throw new CustomError("Student not found", StatusCodes.NOT_FOUND);
    const task = await TaskModel.create({
      ...req.body,
    });

    res.status(StatusCodes.CREATED).json({
      message: "Task created successfully",
      task,
    });
  };
  public getAllTasks = async (req: Request, res: Response) => {
    const id=(req as any).user.id;
    let tasks = await TaskModel.find({assignedTo:id});
  
    tasks = tasks.map(task => {
      const now = new Date();
      const dueDate = new Date(task.dueDate);
      return {
        ...(task as any)._doc,
        overdue: now > dueDate,
      };
    });
  
    res.status(StatusCodes.OK).json({
      message: "Tasks fetched successfully",
      tasks,
    });
  };
  

  public editTask = async (req: Request, res: Response) => {
    const error = this.taskValidatorUpdate.validate(req.body);
    if (error) throw new CustomError(error, StatusCodes.BAD_REQUEST);
    const taskId = req.params.taskId;
    const task= await TaskModel.findById(taskId);
    if(!task) throw new CustomError("Task not found", StatusCodes.NOT_FOUND);
    task.status=req.body.status;
    await task.save();
    res.status(StatusCodes.OK).json({
      message: "Task updated successfully",
      task,
    });
  };
}
