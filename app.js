const express = require("express");
const cors = require("cors");
require("express-async-errors");
require("dotenv").config();

const app = express();
const { sendData } = require("./controller");

const corsOptions = {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

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
