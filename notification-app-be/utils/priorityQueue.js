const Log = require("../../logging-middleware/logger");

const PRIORITY = { Placement: 3, Result: 2, Event: 1 };

async function getTopN(notifications, n = 10) {
  await Log("backend", "info", "priorityQueue", `Sorting ${notifications.length} notifications, picking top ${n}`);

  const sorted = notifications
    .slice()
    .sort((a, b) => {
      const diff = (PRIORITY[b.Type] || 0) - (PRIORITY[a.Type] || 0);
      if (diff !== 0) return diff;
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, n);

  await Log("backend", "info", "priorityQueue", `Returning top ${sorted.length} notifications`);
  return sorted;
}

module.exports = { getTopN };
