require('dotenv').config()

const express = require('express');
const port = process.env.PORT || 3030;

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});