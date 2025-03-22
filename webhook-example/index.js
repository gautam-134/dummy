const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const cors = require("cors");

// Enable all CORS requests
app.use(cors());

// Use body-parser to parse incoming JSON requests
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/webhook", express.text({ type: "*/*" }));

app.post("/webhook", (req, res) => {
  const data = req.body;

  console.log("Raw text data received:", data);

  if (data) {
    // Do whatever you want with the raw text data
    res.status(200).send("Webhook received successfully");
  } else {
    res.status(400).send("No data received");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Webhook server listening at http://localhost:${port}`);
});
