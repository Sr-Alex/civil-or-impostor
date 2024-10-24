require('dotenv').config()

const express = require('express');
const port = process.env.PORT || 3030;

const app = express();

app.use("/", express.static("public"));

app.get("/dev", (req, res) => {
  res.json({ message: "Hello, World!" }); 
});

app.listen(port, () => {
  console.log(`[Server]: Server is running on http://localhost:${port}/`);
});