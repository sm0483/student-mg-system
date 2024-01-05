import { StatusCodes } from "http-status-codes";
import CustomError from "../../../shared/customError";
import StudentModel from "../../models/student.model";
import JwtOperation from "../../utils/jwt.util";
import { Request, Response } from "express";

export default class StudentController {
  private jwtOperation = new JwtOperation();

  public login = async (req: Request, res: Response) => {
    const password = (req.body as any).password;
    const email = (req.body as any).email;
    if (!email || !password) {
      throw new CustomError(
        "Invalid email or password",
        StatusCodes.BAD_REQUEST
      );
    }
    const user = await StudentModel.findOne({ email: email });
    if (!user) {
      throw new CustomError("User not found", StatusCodes.NOT_FOUND);
    }

    const savedPassword = user.password;
    if (savedPassword != password) {
      throw new CustomError(
        "Invalid password or email",
        StatusCodes.UNAUTHORIZED
      );
    }

    const token = this.jwtOperation.createJwt(
      { id: user._id, type: "student" },
      process.env.ACCESS_EXPIRE,
      process.env.ACCESS_SECRET
    );

    res.status(StatusCodes.OK).json({
      token,
      message: "login success",
    });
  };
}
