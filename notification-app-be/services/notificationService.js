const Log = require("../../logging-middleware/logger");
const { TOKEN } = require("../config");

async function getNotifications() {
  await Log("backend", "info", "notificationService", "Fetching notifications from evaluation service");

  const response = await fetch("http://4.224.186.213/evaluation-service/notifications", {
    method: "GET",
    headers: { Authorization: `Bearer ${TOKEN}` }
  });

  if (!response.ok) {
    await Log("backend", "error", "notificationService", `Fetch failed with status ${response.status}`);
    throw new Error("Failed to fetch notifications");
  }

  const data = await response.json();
  await Log("backend", "info", "notificationService", `Fetched ${data.notifications.length} notifications`);
  return data.notifications;
}

module.exports = { getNotifications };
