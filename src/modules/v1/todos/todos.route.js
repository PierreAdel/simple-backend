const express = require("express");
const todoController = require("./todos.controller");
const todoValidation = require("./todos.validation");
const validate = require("../../../middlewares/validate.middleware");

const todoRoute = express.Router();

todoRoute.route("/").get(validate(todoValidation.register), todoController.get);

module.exports = todoRoute;
