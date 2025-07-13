const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use(express.static("public"));

// Feedback endpoint
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));