import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title is required"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
  },
  description: {
    type: String,
    required: [true, "Book description is required"],
  },
  genre: {
    type: String,
    require: [true, "Genre is required"],
  },
  rating: {
    type: Number,
  },
  image: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
