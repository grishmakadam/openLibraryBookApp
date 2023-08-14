const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
// router.get('/helloworld',async(req,res)=>{
//     return res.json("hello wolrd")
// })
const { verifyToken } = require("../middleware/verifyToken");
router.post("/addBook", verifyToken, bookController.post);
router.get("/getBooks/:id", verifyToken, bookController.get);
router.get("/getBookById/:id", verifyToken, bookController.get_book_by_id);
router.patch(
  "/update_progress_status/:email",
  verifyToken,
  bookController.update_progress_status
);
module.exports = router;
