const express = require("express");
const router = express.Router();
const { getNotifications } = require("../services/notificationService");
const { getTopN } = require("../utils/priorityQueue");
const Log = require("../../logging-middleware/logger");

router.get("/priority", async (req, res) => {
  await Log("backend", "info", "notificationRoutes", "GET /api/notifications/priority called");
  try {
    const limit = parseInt(req.query.limit) || 10;
    const notifications = await getNotifications();
    const top = await getTopN(notifications, limit);
    res.status(200).json({ notifications: top });
  } catch (err) {
    await Log("backend", "error", "notificationRoutes", err.message);
    res.status(500).json({ message: "Internal Server Error"});
  }
});

module.exports = router;
