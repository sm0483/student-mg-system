import Joi from "joi";
import extractErrorMessages from "../../shared/extractError.shared";

class StudentValidator {
  private schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    department: Joi.string().required(),
  });

  public validate = (data: object) => {
    return extractErrorMessages(this.schema, data);
  };
}

export default StudentValidator;