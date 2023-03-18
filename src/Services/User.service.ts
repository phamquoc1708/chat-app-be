import createError from "http-errors";
import UserModel from "../Models/User.model";

export type RegisterUserInput = {
  email: string;
  password: string;
};

export interface IUserService {
  register(input: RegisterUserInput): Promise<void>;
}

export class UserService implements IUserService {
  private userModel;
  constructor() {
    this.userModel = UserModel;
  }

  async register(input: RegisterUserInput): Promise<void> {
    try {
      await this.userModel.create(input);
    } catch (err) {
      throw createError.BadRequest();
    }
    return;
  }
}
