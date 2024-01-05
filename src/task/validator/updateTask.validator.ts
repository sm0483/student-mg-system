import Joi from "joi";
import extractErrorMessages from "../../shared/extractError.shared";

class TaskValidatorUpdate {
  private schema = Joi.object({
    status: Joi.string().valid("to-complete").required(),
  });

  public validate = (data: object) => {
    return extractErrorMessages(this.schema, data);
  };
}

export default TaskValidatorUpdate;
