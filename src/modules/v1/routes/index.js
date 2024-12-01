const express = require("express");
const todoRoute = require("../todos/todos.route");

const router = express.Router();

router.use("/todos", todoRoute);

module.exports = router;
