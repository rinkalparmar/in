const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routers/auth"));
app.use("/api/card", require("./routers/card"));
app.use("/api/user", require("./routers/user"));

app.listen(process.env.PORT, () => {
  console.log(`server run on http://localhost:${process.env.PORT}`);
});
