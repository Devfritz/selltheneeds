const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/DB");
const { errorHandler } = require("./middleware/errorHandlers");

connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());

// require route

app.use(`/api/v1/categories`, require("./routes/categoryRoute"));
app.use(`/api/v1/products`, require("./routes/productRoute"));
app.use("/api/v1", require("./routes/userRoute"));
app.use("/api/v1/order/", require("./routes/orderRoute"));

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, console.log(`server is running on the port ${PORT} ✅`));
