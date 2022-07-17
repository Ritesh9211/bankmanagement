const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/users");
const path = require("path");

dotenv.config();
app.use(express.json());
const Port = process.env.PORT || 8000;

mongoose
  .connect(process.env.URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/user", userRoute);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.listen(Port, () => {
  console.log(`Backend is running at ${Port}`);
});
