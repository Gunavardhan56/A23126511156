const express = require("express");
const cors = require("cors");
const Log = require("../logging-middleware/logger");
const { TOKEN } = require("./config");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/notifications", notificationRoutes);

app.post("/api/logs", async (req, res) => {
  try {
    await fetch("http://4.224.186.213/evaluation-service/logs", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });
    res.status(200).json({ success: true });
  } catch {
    res.status(200).json({ success: false });
  }
});

app.listen(PORT, async () => {
  await Log("backend", "info", "index", `Server started on port ${PORT}`);
});
