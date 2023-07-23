const User = require("../models/User");

module.exports = {
  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.signup(name, email, password);
      const newUser = await user.save();
      res.json({success:true,...newUser});
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "Something went wrong!!!" });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const name = user.name;
      const token = await createToken(email);
      res.json({ name, email, token, image });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
};
