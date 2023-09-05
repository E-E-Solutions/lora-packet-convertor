const { StatusCodes } = require("http-status-codes");
const { checkForAuth } = require("./authorizatoin");
const { parseHexadecimalString } = require("./utils");
const Device = require("./sqlQuery");
const db = require("./database");
const axios = require("axios");

// send data
const sendData = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const webhookUrl = "http://localhost:5100/loraData/webhookAdded";

    if (!checkForAuth(res, next, authHeader)) {
      return res.status(StatusCodes.UNAUTHORIZED).json("Unauthorized");
    }

    const { deviceui, deviceName, data } = req.body;

    if (!data) {
      return res
        .status(StatusCodes.BAD_GATEWAY)
        .json("Data field is mandatory.");
    }

    const { voltageValue, timeValue, totalizerValue } =
      parseHexadecimalString(data);
    const deviceAlreadyPresent = await Device.findWithDeciceId(deviceui);

    if (!deviceAlreadyPresent[0][0]) {
      console.log("new device added", deviceAlreadyPresent);
      let device = new Device(
        null,
        deviceui,
        deviceName,
        voltageValue,
        +timeValue,
        totalizerValue
      );
      await device.save();
    } else {
      console.log("device is updating.");
      await Device.updateById(
        voltageValue,
        timeValue,
        totalizerValue,
        deviceui
      );
    }

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
