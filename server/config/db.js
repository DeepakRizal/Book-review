import mongoose from "mongoose";

export default async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB successfully!");
  } catch (error) {
    console.log("Error connection to DB");
  }
}
