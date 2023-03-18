import mongoose from "mongoose";
require("dotenv").config();

async function connect() {
  try {
    await mongoose.connect(process.env.URL_MONGODB || "");
    console.log("Successfully connected");
  } catch (err) {
    console.log("Error connecting");
  }
}
export default { connect };
