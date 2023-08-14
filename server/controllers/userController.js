const User = require("../models/User");
const { createToken } = require("../middleware/createToken");
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
      res.json({ success: true, email: newUser.email, name: newUser.name });
    } catch (e) {
      this.deleteUser(req.body.email);
      res.status(500).json({ message: "Something went wrong!!!" });
    }
  },
  login: async (req, res) => {
    console.log("hii")
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const name = user.name;
      const token = await createToken(email);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 900000000),
        httpOnly: true,
        secure: true,
      });
      res.json({ success: true, name, email });
    } catch (e) {
      console.log(e)
      res.status(400).json({ success: false, error: e.message });
    }
  },
  logout: async (req, res) => {
    res.clearCookie("token");
    return res.json({ success: true, message: "Logged out successfully!!!" });
  },
  deleteUser: async (email) => {
    const user = await User.deleteOne({ email: email });
  }
};
