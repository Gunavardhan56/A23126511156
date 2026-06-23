import { useState, useEffect } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { fetchPriorityNotifications } from "../api/notifications";
import { Log } from "../utils/logger";

export function PriorityNotificationsPage() {
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("All");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPriorityNotifications(limit);
        setNotifications(data.notifications ?? []);
        await Log("frontend", "info", "PriorityPage", `Loaded top ${limit} priority notifications`);
      } catch (err) {
        await Log("frontend", "error", "PriorityPage", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [limit]);

  const displayed =
    filter === "All" ? notifications : notifications.filter((n) => n.Type === filter);

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", px: 2, py: 4 }}>
      <Stack direction="row" sx={{ alignItems: "center" }} spacing={1.5} mb={3}>
        <StarIcon sx={{ fontSize: 28, color: "warning.main" }} />
        <Typography variant="h5" fontWeight={700}>
          Priority Inbox
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Stack direction="row" spacing={2} mb={3} sx={{ alignItems: "center", flexWrap: "wrap" }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Top N</InputLabel>
          <Select value={limit} label="Top N" onChange={(e) => setLimit(e.target.value)}>
            <MenuItem value={10}>Top 10</MenuItem>
            <MenuItem value={15}>Top 15</MenuItem>
            <MenuItem value={20}>Top 20</MenuItem>
          </Select>
        </FormControl>
        <NotificationFilter value={filter} onChange={(v) => setFilter(v || "All")} />
      </Stack>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error">
          Failed to load. Make sure the backend is running on port 5000.
        </Alert>
      )}

      {!loading && !error && displayed.length === 0 && (
        <Alert severity="info">No notifications match the selected filter.</Alert>
      )}

      {!loading && !error && displayed.length > 0 && (
        <Stack spacing={1.5}>
          {displayed.map((n) => (
            <NotificationCard key={n.ID} notification={n} />
          ))}
        </Stack>
      )}
    </Box>
  );
}
