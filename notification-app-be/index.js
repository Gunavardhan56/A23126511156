const express = require("express");
const cors = require("cors");
const Log = require("../logging-middleware/logger");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/notifications", notificationRoutes);

app.listen(PORT, async () => {
  await Log("backend", "info", "index", `Server started on port ${PORT}`);
});
