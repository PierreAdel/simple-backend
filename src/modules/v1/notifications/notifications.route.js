const express = require("express");
const notificationController = require("./notifications.controller");
const notificationValidation = require("./notifications.validation");
const validate = require("../../../middlewares/validate.middleware");

const notificationRoute = express.Router();

notificationRoute
  .route("/")
  .get(validate(notificationValidation.query), notificationController.query)
  .post(validate(notificationValidation.create), notificationController.create);

notificationRoute
  .route("/:id")
  .get(validate(notificationValidation.get), notificationController.get)
  .put(validate(notificationValidation.read), notificationController.read)
  .delete(
    validate(notificationValidation.remove),
    notificationController.remove
  );

module.exports = notificationRoute;
