const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports.verifyToken = async (req, res, next) => {
  console.log(req.cookies);
  if (!req.cookies) {
    console.log("NO COOKIES");
    return res.json({ status: false });
  }
  const token = req.cookies.token;

  if (!token) {
    console.log("FALSE COOKIES");

    return res.json({ status: "false", error: "Session Expired" });
  }
  try {
   
    const { id } = await jwt.verify(token, process.env.TOKEN_KEY);

    const user = await User.findOne({ email: id });
    req.user = user;

    next();
  } catch (e) {
    console.log(e.message);
    // res.clearCookie("token");
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports.clearCookie = async (req, res, next) => {
  res.clearCookie("token");
  res.send({ success: true });
};
