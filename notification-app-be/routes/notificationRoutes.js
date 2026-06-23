const express = require("express");
const router = express.Router();
const { getNotifications } = require("../services/notificationService");
const { getTopN } = require("../utils/priorityQueue");
const Log = require("../../logging-middleware/logger");
const { TOKEN } = require("../config");

router.get("/", async (req, res) => {
  await Log("backend", "info", "notificationRoutes", "GET /api/notifications called");
  try {
    const { page = 1, limit = 10, notification_type } = req.query;
    const params = new URLSearchParams({ page, limit });
    if (notification_type) params.set("notification_type", notification_type);

    const response = await fetch(
      `http://4.224.186.213/evaluation-service/notifications?${params}`,
      { headers: { Authorization: `Bearer ${TOKEN}` } }
    );

    if (!response.ok) {
      await Log("backend", "error", "notificationRoutes", `Upstream fetch failed ${response.status}`);
      return res.status(response.status).json({ message: "Upstream error" });
    }

    const data = await response.json();
    await Log("backend", "info", "notificationRoutes", `Returning ${data.notifications?.length} notifications`);
    res.status(200).json(data);
  } catch (err) {
    await Log("backend", "error", "notificationRoutes", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/priority", async (req, res) => {
  await Log("backend", "info", "notificationRoutes", "GET /api/notifications/priority called");
  try {
    const limit = parseInt(req.query.limit) || 10;
    const notifications = await getNotifications();
    const top = await getTopN(notifications, limit);
    res.status(200).json({ notifications: top });
  } catch (err) {
    await Log("backend", "error", "notificationRoutes", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
