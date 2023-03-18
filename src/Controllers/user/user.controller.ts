import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";

import { HandleFunc } from "../controller";
import { UserService } from "../../Services/User.service";
import { validatePayload } from "../../helpers/validate";

export class UserController {
  constructor(private UserService: UserService) {}

  register(): HandleFunc {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(3).max(20).required(),
    });

    return async (req, res, next) => {
      try {
        const payload = validatePayload(schema, req.body);
        await this.UserService.register(payload);

        res.status(StatusCodes.CREATED).json({});
      } catch (err) {
        next(createError.BadRequest("Email or password is invalid"));
      }
    };
  }
}
