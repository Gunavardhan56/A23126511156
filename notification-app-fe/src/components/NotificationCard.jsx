import { useEffect, useState } from "react";
import { Box, Chip, Paper, Typography } from "@mui/material";

const TYPE_COLOR = { Placement: "success", Result: "warning", Event: "info" };

function getViewedIds() {
  try {
    return JSON.parse(localStorage.getItem("viewedNotifications") || "[]");
  } catch {
    return [];
  }
}

function markAsViewed(id) {
  const viewed = getViewedIds();
  if (!viewed.includes(id)) {
    localStorage.setItem("viewedNotifications", JSON.stringify([...viewed, id]));
  }
}

export function NotificationCard({ notification }) {
  const [viewed, setViewed] = useState(false);

  useEffect(() => {
    const alreadyViewed = getViewedIds().includes(notification.ID);
    setViewed(alreadyViewed);
    markAsViewed(notification.ID);
  }, [notification.ID]);

  const color = TYPE_COLOR[notification.Type] || "default";

  return (
    <Paper
      elevation={viewed ? 0 : 2}
      sx={{
        p: 2,
        backgroundColor: viewed ? "grey.100" : "background.paper",
        borderLeft: "4px solid",
        borderLeftColor: viewed ? "grey.400" : `${color}.main`,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box flex={1}>
          <Chip
            label={notification.Type}
            color={color}
            size="small"
            sx={{ mb: 0.5 }}
          />
          <Typography
            variant="body1"
            fontWeight={viewed ? 400 : 600}
            sx={{ mt: 0.5 }}
          >
            {notification.Message}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {notification.Timestamp}
          </Typography>
        </Box>
        {!viewed && (
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "primary.main",
              mt: 0.5,
              ml: 1,
              flexShrink: 0,
            }}
          />
        )}
      </Box>
    </Paper>
  );
}
