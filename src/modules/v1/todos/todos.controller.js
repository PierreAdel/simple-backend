const httpStatus = require("http-status");
const _ = require("lodash");
const catchAsync = require("../../../utils/catchAsync");
// const ApiError = require("../../../utils/ApiError");
const todoService = require("./todos.service");
// const errorCode = require("../../../codes/error.code");

const create = catchAsync(async (req, res) => {
  await todoService.create(req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

const query = catchAsync(async (req, res) => {
  const result = await todoService.query(_.pickBy(req.query));
  res.send(result);
});

const get = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log("iddsds", id);
  const todo = await todoService.getById(id);
  res.send(todo);
});

const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const todo = await todoService.updateById(id, req.body);
  res.send(todo.email);
});

const remove = catchAsync(async (req, res) => {
  const { id } = req.params;
  await todoService.deleteById(id);
  res.status(httpStatus.NO_CONTENT).send();
});

const todoController = {
  create,
  query,
  get,
  update,
  remove,
};

module.exports = todoController;
