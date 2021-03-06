const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

//  @route GET api/profile/me
//  @desc Get current user profile
//  @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("User", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "No existe perfil de este usuario" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

//  @route POST api/profile
//  @desc Create or update user profile
//  @access Private

router.post(
  "/",
  [
    auth,
    check("status", "Puesto es obligatorio").notEmpty(),
    check("skills", "Abilidades son obligatorias").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // build profile object

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company !== null) profileFields.company = company;
    if (website !== null) profileFields.website = website;
    if (location !== null) profileFields.location = location;
    if (bio !== null) profileFields.bio = bio;
    if (status !== null) profileFields.status = status;
    if (githubusername !== null) profileFields.githubusername = githubusername;
    if (skills !== null) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    // build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //    update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          {
            new: true,
          }
        );

        return res.json(profile);
      }

      //   create

      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

//  @route GET api/profile
//  @desc Get all profiles
//  @access Pubilc

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//  @route GET api/profile/user/:user_id
//  @desc Get profile by ID
//  @access Pubilc

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "Perfil no encontrado" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Perfil no encontrado" });
    }
    res.status(500).send("Server error");
  }
});

//  @route DELETE api/profile
//  @desc Delete profile, user n posts
//  @access Private

router.delete("/", auth, async (req, res) => {
  try {
    //  remove posts

    await Post.deleteMany({ user: req.user.id });

    //   remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //      remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "Usuario borrado" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//  @route PUT api/profile/experience
//  @desc Add profile experience
//  @access Private

router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Título es obligatorio").notEmpty(),
      check("company", "Empresa es obligatoria").notEmpty(),
      check("from", "Fecha de comienzo es obligatoria").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

//  @route DELETE api/profile/experience/:exp_id
//  @desc Delete experience from profile experience
//  @access Private

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index

    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//  @route PUT api/profile/education
//  @desc Add profile education
//  @access Private

router.put(
  "/education",
  [
    auth,
    [
      check("school", "Escuela es obligatoria").notEmpty(),
      check("degree", "Título es obligatorio").notEmpty(),
      check("fieldofstudy", "Campo de estudios es obligatorio").notEmpty(),

      check("from", "Fecha desde es obligatoria").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

//  @route PUT api/profile/education/:edu_id
//  @desc Delete education from profile education
//  @access Private

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index

    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//  @route Get api/profile/github/:username
//  @desc Get user repos form github
//  @access Public

router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) {
        console.error(error);
      }
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "Perfil de Github no encontrado" });
      }
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
