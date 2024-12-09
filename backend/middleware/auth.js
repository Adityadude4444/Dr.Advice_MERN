require("dotenv").config();
const jwt = require("jsonwebtoken");
const middle = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(400).json({ msg: "No token access denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = middle;
