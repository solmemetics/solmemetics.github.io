const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Solmemetics API is running');
});

// Example endpoint
app.post('/feedback', (req, res) => {
  const { publicKey, encryptedData } = req.body;
  console.log("Received:", publicKey, encryptedData);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
