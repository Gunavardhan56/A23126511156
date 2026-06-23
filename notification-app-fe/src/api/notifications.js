import { Log } from "../utils/logger";

const BACKEND = "http://localhost:5000";

export async function fetchNotifications({ page = 1, limit = 10, notification_type } = {}) {
  await Log("frontend", "info", "api", `Fetching notifications page=${page} type=${notification_type || "all"}`);

  const params = new URLSearchParams({ page, limit });
  if (notification_type && notification_type !== "All") {
    params.set("notification_type", notification_type);
  }

  const response = await fetch(`${BACKEND}/api/notifications?${params}`);

  if (!response.ok) {
    await Log("frontend", "error", "api", `Fetch failed status=${response.status}`);
    throw new Error(`Failed to fetch notifications (${response.status})`);
  }

  const data = await response.json();
  await Log("frontend", "info", "api", `Received ${data.notifications?.length} notifications`);
  return data;
}

export async function fetchPriorityNotifications(limit = 10) {
  await Log("frontend", "info", "api", `Fetching priority notifications limit=${limit}`);

  const response = await fetch(`${BACKEND}/api/notifications/priority?limit=${limit}`);

  if (!response.ok) {
    await Log("frontend", "error", "api", `Priority fetch failed status=${response.status}`);
    throw new Error("Failed to fetch priority notifications");
  }

  const data = await response.json();
  await Log("frontend", "info", "api", `Received ${data.notifications?.length} priority notifications`);
  return data;
}
