const User = require("../models/User");

module.exports = {
  post: async (req, res) => {
    try {
      const user = new User({
        name: req.body.name,
      });
      const newUser = await user.save();
      res.json(newUser);
    } catch (e) {
        console.log(e.message)
      res.status(500).json({ message: "Something went wrong!!!" });
    }
  },

};
