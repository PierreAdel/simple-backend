const express = require("express");
const todoController = require("./todos.controller");
const todoValidation = require("./todos.validation");
const validate = require("../../../middlewares/validate.middleware");

const todoRoute = express.Router();

todoRoute
  .route("/")
  .get(validate(todoValidation.query), todoController.query)
  .post(validate(todoValidation.create), todoController.create);

todoRoute
  .route("/:id")
  .get(validate(todoValidation.get), todoController.get)
  .put(validate(todoValidation.update), todoController.update)
  .delete(validate(todoValidation.remove), todoController.remove);

module.exports = todoRoute;
