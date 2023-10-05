import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";//js extension is must 

async function main() {
  await mongoose.connect(
    "mongodb+srv://happy:happy@cluster0-mern-esate.fxgh1ly.mongodb.net/Clustor0-mern-esate?retryWrites=true&w=majority"
  );
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

app.use(express.json())

app.use("/api/user", userRouter);
app.use("/api/auth",authRouter)
