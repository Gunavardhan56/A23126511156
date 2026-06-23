const Log = require("../../logging-middleware/logger");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtYWhhbnRpZ3VuYXZhcmRoYW4uMjMuaXRAYW5pdHMuZWR1LmluIiwiZXhwIjoxNzgyMTk4Nzk3LCJpYXQiOjE3ODIxOTc4OTcsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIzN2E3Y2JkZC0zZTFiLTQ2NjctYWU1NS1lYWZjYjMwNGY0MDciLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJtYWhhbnRpIGd1bmF2YXJkaGFuIiwic3ViIjoiNTlmM2EyNTctYWRiYi00OGExLTlmZmItMDk0MWNiZDZmZDU2In0sImVtYWlsIjoibWFoYW50aWd1bmF2YXJkaGFuLjIzLml0QGFuaXRzLmVkdS5pbiIsIm5hbWUiOiJtYWhhbnRpIGd1bmF2YXJkaGFuIiwicm9sbE5vIjoiYTIzMTI2NTExMTU2IiwiYWNjZXNzQ29kZSI6Ik1UcXhhciIsImNsaWVudElEIjoiNTlmM2EyNTctYWRiYi00OGExLTlmZmItMDk0MWNiZDZmZDU2IiwiY2xpZW50U2VjcmV0IjoiQkFqWmZmY2VydFdFWkF3dyJ9.bcYgkGM1UMIQ8WBF6lJavLC_QMy4Awva2RtqvFXLbUI";

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
