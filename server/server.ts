import { Request, Response, NextFunction } from "express";
const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const user = require("./models/user");
const errorHandler = require("./middleware/error/errorMiddleware");
// import err
//file imports
const test = require("./routes/test");
const auth = require("./routes/auth");

// const { Request, Response, NextFunction } = require("express");

// app.use(cors());

app.use(
  cors({
    credentials: true,
    // origin,
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/test", test);
app.use("/api/auth", auth);

//error handler last middleware
app.use(errorHandler);
// app.use("/api/auth", require("./routes/auth"));

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGOURI);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
