const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const collection = process.env.DB_COLLECTION;

// const uri = `mongodb+srv://${user}:${pass}@cluster0.rcppy.mongodb.net/${collection}?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${user}:${pass}@authtest.rcppy.mongodb.net/${collection}?retryWrites=true&w=majority`;

// Establish connection
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .catch((err) => console.log(err));

// Hold connection
const db = mongoose.connection;

module.exports = db;
