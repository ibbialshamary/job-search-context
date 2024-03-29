const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// get user by email
router.get("/user-details/:email", async (req, res) => {
  try {
    const user = await User.find({ email: req.params.email });
    res.json(user[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

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
        errorMessage:
          "An account with the desired email address already exists",
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
        secure: true,
        sameSite: "none",
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
        .json({ errorMessage: "Invalid email or password" });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!passwordCorrect) {
      return res
        .status(401)
        .json({ errorMessage: "Invalid email or password" });
    }

    // log the user in
    const token = jwt.sign({ user: existingUser._id }, process.env.JWT_SECRET);

    // send token in HTTP only cookie
    res.cookie("loggedInUser", existingUser.email, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    res.status(500).send();
  }
});

// edit profile field in user
router.put("/users/:email", async (req, res) => {
  try {
    const { name, applicant, cv, coverLetter, location, urls } = req.body;
    let today = new Date(Date.now()).toISOString().split("T")[0];
    if (name && applicant && cv && location) {
      const user = await User.updateOne(
        { email: req.params.email },
        {
          $set: {
            profile: {
              name: name,
              applicant: applicant,
              cv: cv,
              coverLetter: coverLetter,
              location: location,
              urls: urls,
              date: today,
            },
          },
        }
      );
      res.json("Successfully updated");
    } else {
      throw "Make sure to fill all fields";
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send();
  }
});

// logout endpoint
router.get("/logout", (req, res) => {
  res.cookie("loggedInUser", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0),
  });
  res
    .cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0),
    })
    .send();
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    const loggedInUser = req.cookies.loggedInUser;

    if (!token) {
      return res.json({ loggedIn: false });
    }

    jwt.verify(token, process.env.JWT_SECRET);
    res.send({ loggedIn: true, loggedInUser: loggedInUser });
  } catch (err) {
    res.json({ loggedIn: false });
  }
});

module.exports = router;
