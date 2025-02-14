import Book from "../models/Book.js";
import catchAsync from "../utils/catchAync.js";

//Add book --admin
export const addBook = catchAsync(async (req, res, next) => {
  const newBook = await Book.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      book: newBook,
    },
  });
});

export const getAllBooks = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  //category filter
  const category = req.query.category;
  const filter = category ? { category } : {};

  //fetch filtered books with pagination
  const books = await Book.find(filter).skip(skip).limit(limit);

  //Count total books for pagination
  res.status(200).json({
    status: "success",
    data: {
      books,
    },
  });
});

export const getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findOne({ _id: req.params.id });

  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
});

export const getFeaturedBooks = catchAsync(async (req, res, next) => {
  const books = await Book.find({ rating: 4.7 }).limit(5);
  res.status(200).json({
    status: "success",
    data: {
      books,
    },
  });
});
