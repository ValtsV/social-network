const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

//  @route GET api/auth
//  @desc Test
//  @access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

//  @route POST api/auth
//  @desc Auth user n Get token
//  @access Public
router.post(
  "/",
  [
    check("email", "Por favor añadese un correo electrónico válido").isEmail(),
    check("password", "Contraseña es obligatoria").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({
            errors: [{ msg: "Correo electrónico y/o contraseña inválido" }],
          });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        {
          return res
            .status(400)
            .json({
              errors: [{ msg: "Correo electrónico y/o contraseña inválido" }],
            });
        }
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (error, token) => {
          if (error) {
            throw error;
          }
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
