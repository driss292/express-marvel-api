const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  try {
    if (req.fields.username === undefined) {
      res.status(400).json({ message: "Missing parameter" });
    } else {
      const isUserExist = await User.findOne({ email: req.fields.email });
      if (isUserExist !== null) {
        res.status(400).json({ message: "This email already has an account" });
      } else {
        const salt = uid2(64);
        const hash = SHA256((req.fields.password = salt)).toString(encBase64);
        const token = uid2(64);

        const newUser = new User({
          username: req.fields.username,
          email: req.fields.email,
          token: token,
          hash: hash,
          salt: salt,
        });

        await newUser.save();
        res.json({
          _id: newUser._id,
          email: newUser.email,
          token: newUser.token,
          username: newUser.username,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ error: message.error });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.fields.email });
    if (user === null) {
      res.status(401).json({ message: "UNAUTHORIZED !!!" });
    } else {
      const newHash = SHA256(req.fields.password + user.salt).toString(
        encBase64
      );
      if (user.hash === newHash) {
        res.json({
          _id: user._id,
          token: user.token,
          username: user.username,
        });
      } else {
        res.status(401).json({ message: "UNAUTHORIZED !!!" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
