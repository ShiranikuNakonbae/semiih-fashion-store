const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// API: get all items
app.get("/api/items", (_req, res) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data.json"), "utf-8"),
  );
  res.json(data);
});

// API: get single item
app.get("/api/items/:id", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data.json"), "utf-8"),
  );
  const item = data.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

app.listen(PORT, () => {
  console.log(`🛍️  Fashion Store running at http://localhost:${PORT}`);
});
