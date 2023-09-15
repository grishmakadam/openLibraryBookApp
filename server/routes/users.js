const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/verifyToken");
router.post("/addUser", userController.signup);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/verifyUser", verifyToken, async (req, res) => {
  if (req.user) {
    return res.json({ success: true, message: "user authorized" });
  }
});

router.patch("/updateDetails", verifyToken, userController.updateDetails);
router.patch("/savePhoto", verifyToken, userController.saveImage);
router.get("/getUserDetails", verifyToken, userController.getDetails)
router.patch("/changePassword",verifyToken,userController.changePassword)
module.exports = router;
