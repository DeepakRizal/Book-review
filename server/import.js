import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
import Book from "./models/Book.js";

//loading environment variables
dotenv.config();

//connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

const books = JSON.parse(fs.readFileSync("./data/data.json", "utf-8"));
console.log(books);

// function to import data
const importData = async () => {
  try {
    await Book.deleteMany();
    await Book.insertMany(books);
    console.log("Books Imported Successfully");
    process.exit();
  } catch (error) {
    console.error("Error Importing Books:", error);
    process.exit(1);
  }
};

importData();
