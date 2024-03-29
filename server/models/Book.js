const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  book_id: {
    type: String,
    required: true,
  },
  book_name: {
    type: String,
    required: true,
  },
  book_author: {
    type: String,
    required: true,
  },
  cover_id: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1,
  },
  progress: {
    type: Number,
  },
  rating: {
    type: Number,
  },
});

module.exports = mongoose.model("Book", bookSchema);
