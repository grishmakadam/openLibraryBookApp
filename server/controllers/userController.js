const User = require("../models/User");
const { createToken } = require("../middleware/createToken");
const bcrypt = require("bcrypt");
module.exports = {
  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await User.signup(name, email, password);
      const newUser = await user.save();
      const token = await createToken(email);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 900000000),
        httpOnly: true,
        secure: true,
      });
      res.json({
        success: true,
        email: newUser.email,
        username: newUser.username,
        fname: newUser.fname,
        lname: newUser.lname,
      });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  login: async (req, res) => {
    console.log("hii");
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = await createToken(email);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 900000000),
        httpOnly: true,
        secure: true,
      });
      res.json({
        success: true,
        email,
        lname: user.lname,
        fname: user.fname,
        image: user.image,
        username: user.username,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ success: false, error: e.message });
    }
  },
  logout: async (req, res) => {
    res.clearCookie("token");
    return res.json({ success: true, message: "Logged out successfully!!!" });
  },
  deleteUser: async (email) => {
    const user = await User.deleteOne({ email: email });
  },
  updateDetails: async (req, res) => {
    try {
      if (req.body.fname) {
        req.user.fname = req.body.fname;
      }
      if (req.body.lname) {
        req.user.lname = req.body.lname;
      }
      if (req.body.username) {
        req.user.username = req.body.username;
      }

      const user = await req.user.save();
      return res.json({
        success: true,
        user: {
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          image: user.image,
          username: user.username,
        },
      });
    } catch (ex) {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong!!!" });
    }
  },
  getDetails: async (req, res) => {
    try {
      const { email, fname, lname, username } = req.user;
      return res.json({
        success: true,
        user: { email, fname, lname, username },
      });
    } catch (ex) {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong!!!" });
    }
  },
  saveImage: async (req, res) => {
    try {
      console.log(req.body);
      req.user.image = req.body.image;

      let user = await req.user.save();
      console.log(user);
      res.json({
        success: true,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        image: user.image,
        username: user.username,
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },
  changePassword: async (req, res) => {
    try {
      const user = await User.login(req.user.email, req.body.password);

      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(req.body.newPassword, salt);

      user.password = hash;
      await user.save();
      return res.json({
        success: true,
        message: "Password changed successfully!!!",
      });
    } catch (ex) {
      res.status(400).json({ success: false, message: ex.message });
    }
  },
};
