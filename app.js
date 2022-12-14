const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users.routes")
const DB_URI = "mongodb://127.0.0.1:27017";

const app = express();
const PORT = 8082;
mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to DB at", DB_URI))
  .catch((error) => console.log("Failed to connect to DB\n", error));

app.use(express.json());
app.use("/users",userRoutes);

app.listen(PORT, () => {
    console.log("Server Listening at", PORT);
  });