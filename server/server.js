import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectToDb from "./config/db.js";
import errorHandler from "./middleware/globalErrorHandler.js";
import bookRouter from "./routes/bookRoutes.js";
import userRouter from "./routes/userRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";

//Config
dotenv.config({ path: ".env" });

//Initialising the app
const app = express();

//connect to db
connectToDb();
//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5174",
  })
);

//routes
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

//error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`connected to server with ${PORT} `);
});
