const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/authRoutes"));
app.use("/api/card", require("./routes/cardRoutes"));
app.use("/api/user", require("./routes/usersCrudRoutes"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
