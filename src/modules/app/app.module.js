const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const httpStatus = require("http-status");
const mongoSanitize = require("express-mongo-sanitize");
const passport = require("passport");
const xss = require("xss-clean");
const ApiError = require("../../utils/ApiError");
const errorCode = require("../../codes/error.code");
const config = require("../../config/config.config");

// const authStrategy = require("../v1/auth/auth.strategy");

const rateLimiter = require("../../middlewares/rateLimiter.middleware");
// const mediaMiddlewares = require("../../middlewares/media.middleware");
const morganService = require("../morgan/morgan.service");
const routes = require("../v1/routes");
const errorMiddlewares = require("../../middlewares/error.middleware");

const app = express();
app.set("trust proxy", true);

if (config.env !== "test") {
  app.use(morganService.successHandler);
  app.use(morganService.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
// passport.use("jwt", authStrategy);

// limit repeated failed requests to endpoints
if (config.env === "production") {
  app.use("/v1/auth", rateLimiter);
}

// v1 api routes
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) =>
  next(new ApiError(httpStatus.NOT_FOUND, errorCode.INVALID_ENDPOINT)),
);

// delete media from cloudinary if there is any error
// app.use(mediaMiddlewares.mediaRemover);

// convert error to ApiError, if needed
app.use(errorMiddlewares.errorConverter);

// handle error
app.use(errorMiddlewares.errorHandler);

module.exports = app;
