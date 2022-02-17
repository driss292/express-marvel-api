const express = require("express");
const axios = require("axios");
const router = express.Router();

// const Character = require("../models/Character");

router.get("/characters", async (req, res) => {
  try {
    const characters = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}`,
      {
        params: {
          apiKey: process.env.MARVEL_API_KEY,
          name: req.query.name,
          skip: (req.query.page - 1) * 100,
        },
      }
    );
    res.json(characters.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/characters/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;
    const character = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.json(character.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
