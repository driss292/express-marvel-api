const express = require("express");
const axios = require("axios");
const router = express.Router();

// const Comic = require("../models/Comic");
// const User = require("../models/User");

router.get("/comics", async (req, res) => {
  try {
    const comics = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}`,
      {
        params: {
          apiKey: process.env.MARVEL_API_KEY,
          title: req.query.title,
          skip: (req.query.page - 1) * 100,
        },
      }
    );
    res.json(comics.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;
    const comics = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.json(comics.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
