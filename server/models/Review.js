import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: [true, "BookId is required"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserId is required"],
  },
  rating: {
    type: Number,
  },
  comment: {
    type: String,
    required: [true, "Comment is required"],
  },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
