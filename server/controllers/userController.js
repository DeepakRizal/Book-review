import User from "../models/User.js";
import catchAsync from "../utils/catchAync.js";

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id });

  res.status(200).json({
    status: "succes",
    data: {
      user,
    },
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
