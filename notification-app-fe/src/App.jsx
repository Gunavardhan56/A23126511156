import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StarIcon from "@mui/icons-material/Star";
import { NotificationsPage } from "./pages/NotificationsPage";
import { PriorityNotificationsPage } from "./pages/PriorityNotificationsPage";

function NavBar() {
  const location = useLocation();
  return (
    <AppBar position="static" elevation={1} sx={{ backgroundColor: "white", color: "text.primary" }}>
      <Toolbar>
        <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1 }}>
          Campus Notifications
        </Typography>
        <Button
          component={Link}
          to="/"
          startIcon={<NotificationsIcon />}
          variant={location.pathname === "/" ? "contained" : "text"}
          sx={{ mr: 1, textTransform: "none" }}
        >
          All
        </Button>
        <Button
          component={Link}
          to="/priority"
          startIcon={<StarIcon />}
          variant={location.pathname === "/priority" ? "contained" : "text"}
          sx={{ textTransform: "none" }}
        >
          Priority
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Box>
        <Routes>
          <Route path="/" element={<NotificationsPage />} />
          <Route path="/priority" element={<PriorityNotificationsPage />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}
