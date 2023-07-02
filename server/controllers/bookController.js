const Book = require("../models/Book");
const User = require("../models/User");
module.exports = {
  post: async (req, res) => {
    console.log(req.body)
    try {
      const newBook = new Book({
        book_author: req.body.author[0],
        book_name: req.body.title,
        cover_id: req.body.cover_id,
        book_id: req.body.id,
        status: req.body.status,
      });
      const name = req.body.name;
      const book = await newBook.save();
      const u = await User.findOne({ name });
      console.log(u)
      u.books.push(book._id);
      await u.save();
      res.json(book);
    } catch (ex) {
        console.log(ex.message)
      res.status(500).json({ message: "Something went wrong!!!" });
    }
  },
  get: async (req, res) => {
    console.log("hii")
    try {
      const {id} = req.params;
      console.log(id)
      const user = await User.findOne({ name:id });
      const books =await user.populate("books");
      res.json(books.books)
    } catch (e) {
        console.log(e.message)
        res.json("something went wrong")
    }
  },
};
