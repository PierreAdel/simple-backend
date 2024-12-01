const todoSchema = {
  title: {
    type: "string",
    transform: ["trim"],
    required: true,
  },
  text: {
    type: "string",
    transform: ["trim"],
    required: true,
  },
  createdAt: { type: ["string", "null"], format: "date-time" },
};

module.exports = todoSchema;
