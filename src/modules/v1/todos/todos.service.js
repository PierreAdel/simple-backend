const _ = require("lodash");
const httpStatus = require("http-status");
const ApiError = require("../../../utils/ApiError");
const dalService = require("../../dal/dal.service");
const errorCode = require("../../../codes/error.code");
const { ObjectId } = require("mongodb");

const collectionName = "todos";

async function create(createDto) {
  // const document = await dalService.readOne(
  //   collectionName,
  //   { _id: new ObjectId(createDto.id) },
  //   {},
  //   createDto.id,
  // );
  // if (document)
  //   throw new ApiError(httpStatus.BAD_REQUEST, errorCode.TAKEN_EMAIL);
  return dalService.createOne(collectionName, createDto);
}

/**
 * Query documents
 * @param {object} queryDto - Query
 * @returns {Promise<{ pages: number, documents: [object] }>} Object of total number of pages and found documents
 */
async function query(queryDto) {
  const filters = _.omit(queryDto, ["search", "sort", "limit", "page"]);
  const options = _.pick(queryDto, ["sort", "limit", "page", "skip"]);
  if (queryDto.search)
    filters.name = { $regex: queryDto.search, $options: "i" };
  if (queryDto.limit) options.skip = queryDto.limit * (queryDto.page - 1);
  if (queryDto.sort)
    options.sort = _.mapValues(
      _.keyBy(queryDto.sort.split(" "), (e) =>
        e[0] === "-" ? e.substring(1) : e
      ),
      (e) => (e[0] === "-" ? -1 : 1)
    );
  const result = await dalService.readMany(collectionName, filters, {
    ...options,
  });
  return result;
}

async function getById(id) {
  const document = await dalService.readOne(
    collectionName,
    { _id: new ObjectId(id) },
    {},
    id
  );
  if (!document)
    throw new ApiError(httpStatus.NOT_FOUND, errorCode.INVALID_TODO_ID);
  return document;
}

async function updateById(id, updateDto) {
  const document = await dalService.updateOne(
    collectionName,
    { _id: new ObjectId(id) },
    { $set: updateDto },
    { new: true },
    id
  );
  if (!document)
    throw new ApiError(httpStatus.NOT_FOUND, errorCode.INVALID_TODO_ID);
  return document;
}

async function deleteById(id) {
  const deleted = await dalService.deleteOne(
    collectionName,
    { _id: new ObjectId(id) },
    {},
    id
  );
  if (!deleted)
    throw new ApiError(httpStatus.NOT_FOUND, errorCode.INVALID_TODO_ID);
  return deleted;
}

const todoService = {
  create,
  query,
  getById,
  updateById,
  deleteById,
};

module.exports = todoService;
