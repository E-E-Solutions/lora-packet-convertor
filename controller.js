const { StatusCodes } = require("http-status-codes");
const { checkForAuth } = require("./authorizatoin");
const { parseHexadecimalString } = require("./utils");
const fs = require("fs");
const path = require("path");
const http = require("http");

const saveDataToFile = (data) => {
  const filename = "LoraData.json";
  const timestamp = new Date().toISOString();
  const newData = { timestamp, ...data };
  const newDataJSON = JSON.stringify(newData, null, 2);
  const appendedData = `${newDataJSON},`;
  fs.appendFileSync(filename, appendedData, "utf8");
};

const sendData = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!checkForAuth(res, next, authHeader))
      return res.status(StatusCodes.UNAUTHORIZED).json("Unauthorized");

    const { deviceName, data } = req.body;
    if (!data)
      return res
        .status(StatusCodes.BAD_GATEWAY)
        .json("Data field is mandatory.");

    const { BatteryVoltage, forwardTotalizer } = parseHexadecimalString(data);
    const id = "GFM" + deviceName;
    const totalizer = forwardTotalizer;
    const battery_voltage = BatteryVoltage;
    // ......save data to file
    const now = new Date();
    const timestamp = now.toISOString().replace(/:/g, "-");
    saveDataToFile({ id, totalizer, battery_voltage, data, timestamp });

    const postData = JSON.stringify({ totalizer, battery_voltage, id });

    const options = {
      hostname: "apis.enggenv.com",
      path: "/api/data/push",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
        Authorization: authHeader,
      },
    };

    const request = http.request(options, (response) => {
      let responseBody = "";
      response.on("data", (chunk) => (responseBody += chunk));
      response.on("end", () =>
        console.log("Response from server:", responseBody)
      );
    });

    request.on("error", (error) => {
      console.error("Error sending request:", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "An error occurred while adding device information." });
    });

    request.write(postData);
    request.end();

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
