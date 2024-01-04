import Joi from "joi";
import extractErrorMessages from "./extractError.shared";
import mongoose from "mongoose";

class IdValidator {
  private schema = Joi.object({
    id: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error("any.invalid");
        }
        return value;
      }, "Mongoose ObjectId")
      .required(),
  });

  public validate = (id: string) => {
    const objectId = { id };
    return extractErrorMessages(this.schema, objectId);
  };
}

export default IdValidator;