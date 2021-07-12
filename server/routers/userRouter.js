const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register
router.post("/register", async (req, res) => {
  try {
    const { email, password, verifyPassword } = req.body;

    // validation
    if (!email || !password || !verifyPassword) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters",
      });
    }

    if (password !== verifyPassword) {
      return res.status(400).json({
        errorMessage: "Please make sure your passwords match",
      });
    }

    // if user email matches registered email
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        errorMessage: "An account with the desired email address already exists",
      });
    }

    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save a new user account to the db
    const newUser = new User({
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();

    // log in the user
    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    // send token in HTTP only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    res.status(500).send();
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields" });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(401)
        .json({ errorMessage: "Invalid username or password" });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!passwordCorrect) {
      return res
        .status(401)
        .json({ errorMessage: "Invalid username or password" });
    }

    // log in the user
    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    // send token in HTTP only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    res.status(500).send();
  }
});

// logout endpoint
router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json(false);
    }

    jwt.verify(token, process.env.JWT_SECRET);
    res.send(true);
  } catch (err) {
    res.json(false);
  }
});

module.exports = router;
