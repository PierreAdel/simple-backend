const express = require("express");
const notificationRoute = require("../notifications/notifications.route");

const router = express.Router();

router.use("/notifications", notificationRoute);

module.exports = router;
