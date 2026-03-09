const express = require("express");
require("dotenv").config();
const errorMiddleware = require("./middlewares/error.middleware");
const notFound = require("./middlewares/notFound.middleware");
const morgan = require("morgan");

const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));



// routes
const authRouter = require("./modules/auth/auth.route");

app.use("/auth/", authRouter);


// global error
app.use(errorMiddleware);
app.use(notFound);

module.exports = app;
