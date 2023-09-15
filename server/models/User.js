const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verfied: {
    type: Boolean,
    // required:true,
    default: true,
  },
  image: {
    type: String,
  },
  books: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Book",
    },
  ],
});

userSchema.statics.signup = async function (name, email, password) {
  if (!name || !email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Not a strong password");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  const username = await email.split("@")[0];
  let arr;
  if (name.includes(" ")) {
    arr = name.split(" ");
  }

  const user = await this.create({
    fname: arr[0],
    lname: arr[1],
    username,
    email,
    password: hash,
    image: "",
  });
  return user;
};

userSchema.statics.login = async function (email, password) {
  console.log(email)
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email not valid");
  }

  const match = await bcrypt.compare(password, user.password);

  if (match) {
    if (user.verfied) {
      return user;
    } else {
      throw Error("Email Not Verified! Please check your inbox");
    }
  } else {
    throw Error("Incorrect password");
  }
};
module.exports = mongoose.model("User", userSchema);
