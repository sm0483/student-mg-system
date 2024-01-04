import { Request } from "express";

interface IRequestWithUser extends Request {
  user?: {
    id: string;
    email: string;
  };
  data?: object;
}

export default IRequestWithUser;