import createError from "http-errors";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schemaUser = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

schemaUser.pre("save", async function (next) {
  try {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(this.password, salt);
      this.password = passwordHash;
      next();
    }
    next(createError.BadRequest());
  } catch (err: any) {
    next(createError.BadRequest(err));
  }
});

export default mongoose.model("Users", schemaUser);
