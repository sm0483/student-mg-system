import Joi from "joi";
import extractErrorMessages from "../../shared/extractError.shared";

class TaskValidator {
  private schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    dueDate: Joi.date().required(),
    status: Joi.string()
      .valid("assigned", "to-complete", "completed")
      .required(),
    assignedTo: Joi.string().required(),
  });

  public validate = (data: object) => {
    return extractErrorMessages(this.schema, data);
  };
}

export default TaskValidator;
