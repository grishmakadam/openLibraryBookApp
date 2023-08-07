const Book = require("../models/Book");
const User = require("../models/User");
module.exports = {
  post: async (req, res) => {
    console.log(req.body);
    try {
      const newBook = new Book({
        book_author: req.body.author,
        book_name: req.body.title,
        cover_id: req.body.cover_id,
        book_id: req.body.id,
        status: req.body.status,
      });
      const name = req.body.name;
      const book = await newBook.save();
      const u = await User.findOne({ name });
      console.log(u);
      u.books.push(book._id);
      await u.save();
      res.json(book);
    } catch (ex) {
      console.log(ex.message);
      res.status(500).json({ message: "Something went wrong!!!" });
    }
  },
  get: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const user = await User.findOne({ name: id });
      const books = await user.populate("books");
      res.json(books.books);
    } catch (e) {
      console.log(e.message);
      res.json("something went wrong");
    }
  },
  get_book_by_id: async (req, res) => {
    try {
      const { id } = req.params;
      const { bookId } = req.query;

      const user = await User.findOne({ email: id });

      const book = (await user.populate("books")).books.filter(
        (x) => x.book_id == bookId
      );
      if (book) {
        return res.json({ sucess: true, book: book });
      } else {
        return res.json({ success: false });
      }
    } catch (ex) {
      return res.json({ success: false, message: ex.message });
    }
  },
  update_progress_status: async (req, res) => {
    try {
      const { email } = req.params;
      const { status, progress, rating, id} = req.body;

      const user = await User.findOne({ email: email });
      const book = await user
        .populate("books")
        .books.filter((x) => x.book_id == bookId);

      book.status = status;
      book.progress = progress;
      book.rating = rating;

      await book.save();
      return res.json({ success: true, book: book });
    } catch (ex) {
      return res.json({ success: false, message: ex.message });
    }
  },
};
