const { StatusCodes } = require("http-status-codes");
const { checkForAuth } = require("./authorizatoin");
const { parseHexadecimalString } = require("./utils");
const axios = require("axios");

// send data
const sendData = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const webhookUrl =
      "https://data-reciever.onrender.com/loraData/webhookAdded";

    if (!checkForAuth(res, next, authHeader)) {
      return res.status(StatusCodes.UNAUTHORIZED).json("Unauthorized");
    }

    const { deviceui, deviceName, data } = req.body;

    if (!data) {
      return res
        .status(StatusCodes.BAD_GATEWAY)
        .json("Data field is mandatory.");
    }

    const { supplyTime, BatteryVoltage, forwardTotalizer } =
      parseHexadecimalString(data);
    req.body.supplyTime = supplyTime;
    req.body.BatteryVoltage = BatteryVoltage;
    req.body.forwardTotalizer = forwardTotalizer;
    // Webhooks...............
    await axios.post(
      webhookUrl,
      { data: req.body, message: "Data added sucessfully." },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res
      .status(StatusCodes.OK)
      .json({ message: "Device information added successfully!" });
  } catch (err) {
    console.error(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while adding device information." });
  }
};

module.exports = { sendData };
