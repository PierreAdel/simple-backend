const notificationSchema = {
  type: {
    enum: ["friend_request", "post", "like", "birthday", "login"],
    required: true,
  },
  userName: {
    type: "string",
    transform: ["trim"],
    required: false,
  },
  isRead: { type: "boolean", required: false },
  createdAt: { type: ["string", "null"], format: "date-time" },
};

module.exports = notificationSchema;
