const express = require("express");
require("express-async-errors");
require("dotenv").config();

const app = express();
const { sendData } = require("./controller");

app.use(express.json());
// post routes
app.post("/api/v1/send", sendData);
//  port
const port = 3345;

// connection function
const start = () => {
  try {
    app.listen(port, () => console.log(`connected to port ${port}`));
  } catch (err) {
    console.log(err);
  }
};
start();
