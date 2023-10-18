import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js"; //js extension is must
import dotenv from "dotenv"
dotenv.config();

async function main() {
  await mongoose.connect(process.env.MONGO);
}
main()
  .then(() => {
    console.log("CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.listen(3000, () => {
  console.log(`server is runing on port ${3000}`);
});

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  console.log(` error in middleware ${err.statusCode} message this : ${err.message}`);
  const statusCode = err.statusCode || 500;
  const messege = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    messege,
  });
});
