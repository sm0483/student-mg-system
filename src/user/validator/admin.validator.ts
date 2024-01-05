import Joi from "joi";
import extractErrorMessages from "../../shared/extractError.shared";

class AdminValidator {
  private schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required(),
  });

  public validate = (data: object) => {
    return extractErrorMessages(this.schema, data);
  };
}

export default AdminValidator;