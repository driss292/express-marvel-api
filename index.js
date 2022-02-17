require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(formidable());

const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

app.get("/", (req, res) => {
  res.status(200).json("Welcome to the MARVEL-api");
});

app.all("*", (req, res) => {
  res.status(404).json({ error: "Page Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server OK !!!");
});
