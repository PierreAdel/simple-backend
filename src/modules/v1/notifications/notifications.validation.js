const validationUtil = require("../../../utils/validation.util");
const commonValidation = require("../../../validations/common.validation");
const schema = require("./notifications.schema");

const { schema: notificationSchema, required } =
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
    properties: notificationSchema,
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

const read = {
  params,
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

const notificationValidation = {
  create,
  query,
  get,
  read,
  remove,
};

module.exports = notificationValidation;
