import createError from "http-errors";

export function validatePayload(schema: any, payload: Object) {
  const { error, value } = schema.validate(payload);
  if (error) {
    throw createError.BadRequest("Email or password is invalid");
  }
  return value;
}
