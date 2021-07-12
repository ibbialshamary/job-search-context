const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        errorMessage: "Unauthorised",
      });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user;

    next();
  } catch (err) {
    res.status(401).json({
      errorMessage: "Unauthorised",
    });
  }
};

module.exports = auth;
