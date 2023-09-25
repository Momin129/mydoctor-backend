const express = require("express");
const { connectDB } = require("./config/db");
const cors = require("cors");
require("dotenv").config();

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", require("./routes/userRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Listing on PORT ${process.env.PORT}`);
});
