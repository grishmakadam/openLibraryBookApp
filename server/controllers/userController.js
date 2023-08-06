const User = require("../models/User");

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
      res.cookie("token", token, {
        expires: new Date(Date.now() + 900000000),
        httpOnly: true,
        secure: true,
      });
      res.json({ sucess:true,name, email, image });
    } catch (e) {
      res.status(400).json({sucess:false, error: e.message });
    }
  },
};
