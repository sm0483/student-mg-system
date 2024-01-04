import Joi from "joi";

const extractErrorMessages = (scheme: Joi.Schema, data: object) => {
  const { error } = scheme.validate(data, {
    abortEarly: false,
  });
  if (error) {
    const messages = error.details.map((err) => err.message);
    const newError = messages.join(", ").replace("", "");

    return newError;
  }
  return null;
};

export default extractErrorMessages;