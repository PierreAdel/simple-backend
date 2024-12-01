const validationUtil = require("../../../utils/validation.util");
const commonValidation = require("../../../validations/common.validation");
const schema = require("./todos.schema");

const { schema: todoSchema, required } =
  validationUtil.getSchemaAndRequiredArray(schema);

const params = {
  type: "object",
  minProperties: 1,
  properties: {
    id: {
      type: ["string"],
      transform: ["trim"],
    },
  },
  required: ["id"],
  additionalProperties: false,
};

const create = {
  body: {
    type: "object",
    minProperties: 1,
    properties: todoSchema,
    additionalProperties: false,
    required,
  },
};

const query = {
  query: {
    type: "object",
    minProperties: 1,
    properties: {
      ...commonValidation.queryProps,
    },
    additionalProperties: false,
  },
};

const update = {
  params,
  body: {
    type: "object",
    minProperties: 1,
    properties: todoSchema,
    additionalProperties: false,
  },
};

const get = {
  params,
};

const remove = {
  params,
};

// const resetPassword = {
//   params,
//   body: {
//     type: 'object',
//     minProperties: 1,
//     properties: {
//       currentPassword: { type: 'string' },
//       newPassword: { type: 'string', pattern: regexConstant.password.source },
//     },
//     allRequired: true,
//     additionalProperties: false,
//     errorMessage: {
//       properties: {
//         newPassword:
//           'must be of minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.',
//       },
//     },
//   },
// };

const todoValidation = {
  create,
  query,
  get,
  update,
  remove,
};

module.exports = todoValidation;
