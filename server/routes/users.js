const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/verifyToken");
router.post("/addUser", userController.signup);
router.post("/login", userController.login);
router.get("/logout",userController.logout)
router.get("/verifyUser", verifyToken, async (req, res) => {
  if (req.user) {
    return res.json({ success: true, message: "user authorized" });
  }
});

module.exports = router;
