import Joi from "joi";
import extractErrorMessages from "./extractError.shared";

class PageDataValidator {
  private schema = Joi.object({
    page: Joi.number().required(),
    limit: Joi.number().required(),
  });

  public validate = (data: object) => {
    return extractErrorMessages(this.schema, data);
  };
}

export default PageDataValidator;