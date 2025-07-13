const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html for all unmatched routes
app.get("*", (req, res) => {
  const filePath = path.join(__dirname, "public", "index.html");
  res.sendFile(filePath, err => {
    if (err) {
      console.error("Error serving index.html:", err);
      res.status(500).send("Server error: Unable to serve page");
    }
  });
});

// Feedback submission endpoint
app.post("/feedback", async (req, res) => {
  try {
    const { publicKey, encryptedData, timestamp } = req.body;
    await fs.appendFile("feedback.json", JSON.stringify({ publicKey, encryptedData, timestamp }) + "\n");
    res.status(200).json({ message: "Feedback received" });
  } catch (err) {
    console.error("Error storing feedback:", err);
    res.status(500).json({ error: "Failed to store feedback" });
  }
});

// Feedback retrieval endpoint
app.get("/get-feedback", async (req, res) => {
  try {
    const data = await fs.readFile("feedback.json", "utf8");
    const feedback = data.split("\n").filter(line => line).map(line => JSON.parse(line));
    res.status(200).json(feedback);
  } catch (err) {
    if (err.code === "ENOENT") {
      res.status(200).json([]);
    } else {
      console.error("Error fetching feedback:", err);
      res.status(500).json({ error: "Failed to fetch feedback" });
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));