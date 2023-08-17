const Book = require("../models/Book");
const User = require("../models/User");

module.exports = {
  post: async (req, res) => {
    try {
      const user = req.user;

      const books = (await user.populate("books")).books.filter(
        (x) => x.book_id == req.body.id
      );
      if (books.length != 0) {
        return res.json({ success: false, message: "book already exits" });
      }

      const newBook = new Book({
        book_author: req.body.author[0],
        book_name: req.body.title,
        cover_id: req.body.cover_id,
        book_id: req.body.id,
        status: req.body.status,
      });
      console.log("hii");

      const book = await newBook.save();
      user.books.push(book._id);
      await user.save();
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
      const { bookId } = req.query;

      const user = req.user;

      const book = (await user.populate("books")).books.filter(
        (x) => x.book_id == bookId
      );
      if (book.length != 0) {
        return res.json({ success: true, book: book });
      } else {
        return res.json({ success: false });
      }
    } catch (ex) {
      return res.json({ success: false, message: ex.message });
    }
  },
  update_progress_status: async (req, res) => {
    try {
      const { status, progress, rating, id } = req.body;
      console.log(req.body.progress);
      const user = req.user;
      const temp = (await user.populate("books")).books.filter(
        (x) => x.book_id == id
      );
      if (temp.length != 0) {
        const book = await Book.findById(temp[0]._id);
        book.status = status;
        book.progress = progress;
        book.rating = rating;
        await book.save();
        return res.json({ success: true, book: book });
      }

      return res.json({ success: false, message: "book not in db" });
    } catch (ex) {
      return res.json({ success: false, message: ex.message });
    }
  },
};
