import { StatusCodes } from "http-status-codes";
import CustomError from "../../../shared/customError";
import AdminValidator from "../../validator/admin.validator";
import JwtOperation from "../../../user/utils/jwt.util";
import { Request, Response } from "express";
import StudentValidator from "../../validator/student.validator";
import StudentModel from "../../models/student.model";

export default class AdminController {
  private adminValidator: AdminValidator = null;
  private jwtOperation: JwtOperation = null;
  private studentValidator: StudentValidator = null;

  constructor() {
    this.adminValidator = new AdminValidator();
    this.jwtOperation = new JwtOperation();
    this.studentValidator = new StudentValidator();
  }

  public login = async (req: Request, res: Response) => {
    const data = req.body;
    const error = this.adminValidator.validate(req.body);
    if (error) throw new CustomError(error, StatusCodes.BAD_REQUEST);
    const { email, password } = req.body as any;
    if (email == "admin@admin.com" && password == "admin") {
      const token = this.jwtOperation.createJwt(
        { userId: email, type: "admin" },
        process.env.ACCESS_EXPIRE,
        process.env.ACCESS_SECRET
      );
      return res
        .status(StatusCodes.OK)
        .json({ message: "login success", token: token });
    }
    throw new CustomError("invalid email or password", StatusCodes.BAD_REQUEST);
  };

  public addStudent = async (req: Request, res: Response) => {
    const error = this.studentValidator.validate(req.body);
    const email = req.body.email;
    const isEmailPresent=await StudentModel.find({email:email});
    if(isEmailPresent.length>0){
      throw new CustomError("Email already present", StatusCodes.BAD_REQUEST);
    }
    if (error) throw new CustomError(error, StatusCodes.BAD_REQUEST);
    await StudentModel.create(req.body);
    return res
      .status(StatusCodes.OK)
      .json({ message: "Student added successfully" });
  };


  public getStudents = async (req: Request, res: Response) => {
    const students = await StudentModel.find();
    return res
      .status(StatusCodes.OK)
      .json({ message: "Students fetched successfully", students });
  }
}
