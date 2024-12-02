const httpStatus = require("http-status");
const _ = require("lodash");
const catchAsync = require("../../../utils/catchAsync");
// const ApiError = require("../../../utils/ApiError");
const notificationService = require("./notifications.service");
// const errorCode = require("../../../codes/error.code");

const create = catchAsync(async (req, res) => {
  await notificationService.create(req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

const query = catchAsync(async (req, res) => {
  const result = await notificationService.query(_.pickBy(req.query));
  res.send(result);
});

const get = catchAsync(async (req, res) => {
  const { id } = req.params;
  const notification = await notificationService.getById(id);
  res.send(notification);
});

const read = catchAsync(async (req, res) => {
  const { id } = req.params;
  const notification = await notificationService.updateById(id, {
    isRead: true,
  });
  res.send(notification.email);
});

const remove = catchAsync(async (req, res) => {
  const { id } = req.params;
  await notificationService.deleteById(id);
  res.status(httpStatus.NO_CONTENT).send();
});

const notificationController = {
  create,
  query,
  get,
  read,
  remove,
};

module.exports = notificationController;
