import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";
import { Log } from "../utils/logger";

export function useNotifications(filter, page) {
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchNotifications({ page, limit: 10, notification_type: filter });
        setNotifications(data.notifications ?? []);
        setTotal(data.total ?? 0);
        await Log("frontend", "info", "useNotifications", `Loaded ${data.notifications?.length} notifications`);
      } catch (err) {
        await Log("frontend", "error", "useNotifications", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [filter, page]);

  const totalPages = Math.ceil(total / 10) || 1;
  return { notifications, total, totalPages, loading, error };
}
