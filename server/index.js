const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./db");
const router = require("./router");
dotenv.config();

const port = 3000;

app.use(cors());
app.use(express.json());

db.once("open", () => {
  console.log("Connected to Database.");
  app.use("/", router);

  app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
  });
});
