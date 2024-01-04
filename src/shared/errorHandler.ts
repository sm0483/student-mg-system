/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import CustomError from "../shared/customError";
import { Request } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // eslint-disable-next-line no-console
  if (err instanceof CustomError) {
    return res
      .status(err.status)
      .json({ error: err.message, status: err.status });
  }
  res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
    error: err.message,
    status: StatusCodes.SERVICE_UNAVAILABLE,
  });
};

export default errorHandler;