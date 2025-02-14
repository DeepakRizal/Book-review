import Review from "../models/Review.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAync.js";

export const getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({});

  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
});

export const createReview = catchAsync(async (req, res, next) => {
  // Ensure that the logged-in user matches the userId in the review data
  if (req.user.id !== req.body.userId) {
    return next(
      new AppError(
        "You are not allowed to create a review for another user.",
        403
      )
    );
  }

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      review: newReview,
    },
  });
});

export const getBookReview = catchAsync(async (req, res, next) => {
  const { bookId } = req.params;

  const reviews = await Review.find({ bookId });

  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
});
