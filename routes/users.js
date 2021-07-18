const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

//@route POST api/users
//@desc test route
//@access Public
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("age", "age is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, age, file } = req.body;
    try {
      const user = new User({
        name,
        age,
        file,
      });
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.mesasge);
      res.status(5000).send("Server Error");
    }
  }
);

module.exports = router;
