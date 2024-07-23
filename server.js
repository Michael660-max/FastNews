const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/index");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

app.use(express.json());

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/", userRouter);

app.get("/", (req, res) => {
  res.send("Hello, world!!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
