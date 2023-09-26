const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/specialityRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Listing on PORT ${process.env.PORT}`);
});
