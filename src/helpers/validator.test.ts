import createError from "http-errors";
import assert from "assert";
import Joi from "joi";

import { validatePayload } from "./validate";
import { describe, it } from "node:test";

describe("validatePayload", () => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  it("Should throw an error when the payload is invalid", () => {
    const invalidPayload = { email: "invalid_email", password: "12345" };
    assert.throws(
      () => validatePayload(schema, invalidPayload),
      createError.BadRequest("Email or password is invalid")
    );
  });

  it("Should return the value when the payload is valid", () => {
    const validPayload = { email: "test@example.com", password: "password123" };
    const result = validatePayload(schema, validPayload);
    assert.deepEqual(result, validPayload);
  });
});
