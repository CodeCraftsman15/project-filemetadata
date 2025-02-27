require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

// Enable CORS
app.use(cors());

// Serve static files (including the index.html form)
app.use("/public", express.static(process.cwd() + "/public"));

// Show index.html on root
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Configure multer storage (memory or disk)
// We'll use 'memoryStorage' for simplicity
const upload = multer({ storage: multer.memoryStorage() });

/**
 * POST /api/fileanalyse
 * Multer middleware: 'single("upfile")' => look for <input name="upfile" ... />
 */
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  // If no file is uploaded, handle it
  if (!req.file) {
    return res.json({ error: "No file uploaded" });
  }

  // Prepare our JSON response
  const fileInfo = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };

  res.json(fileInfo);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Your app is listening on port " + port);
});
