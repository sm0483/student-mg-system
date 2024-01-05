import { Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import CustomError from "../shared/customError";
import JwtOperations from "../user/utils/jwt.util";
import IRequestWithUser from "./IRequestWithUser";

interface ITokenResponse {
  payload: {
    userId: string;
    email: string;
    type: string;
  };
}

const verifyAccessTokenAdmin = (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  let token = req.headers?.authorization;
  if (!token) {
    throw new CustomError("Token not present", StatusCodes.UNAUTHORIZED);
  }
  token = token?.split(" ")[1];
  const jwtOperations = new JwtOperations();
  try {
    const tokenResponse: unknown = jwtOperations.isTokenValid(
      token,
      process.env.ACCESS_SECRET,
    );
    if (!tokenResponse || (tokenResponse as ITokenResponse).payload.type !== "admin") {
      throw new CustomError("Invalid token", StatusCodes.UNAUTHORIZED);
    }
    req.user = {
      id: (tokenResponse as ITokenResponse).payload.userId,
      email: (tokenResponse as ITokenResponse).payload.email,
    };
    return next();
  } catch (err) {
    throw new CustomError(err.message, StatusCodes.FORBIDDEN);
  }
};

export default verifyAccessTokenAdmin;