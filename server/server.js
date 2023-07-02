require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors=require('cors')
const bookRouter = require("./routes/book");
const userRouter = require("./routes/users");
const app = express();
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlparser: true });
const db = mongoose.connection;

db.once("open", () => console.log("connected"));
app.use(cors())
app.use("/books", bookRouter);
app.use("/users", userRouter);

app.listen(8000, () => console.log("listening"));
