const { StatusCodes } = require("http-status-codes");

// Function to extract specific bits from a hexadecimal value
function extractByts(hexValue, startBit, endBit) {
  const bytes = hexValue.substring(startBit, endBit); // Bytes 6 to 7
  const value = parseInt(bytes, 16);
  return value;
}

// send data
const sendData = (req, res) => {
  const body = req.body;
  const auth = req.headers.authorization;

  const {
    srNo,
    applicationId,
    applicationName,
    deviceName,
    deviceui,
    fport,
    data,
  } = req.body;
  if (!data) {
    res.status(StatusCodes.BAD_GATEWAY).json("Data field is mandatory..");
  }
  let hexValue = data;
  // here we extract info from the data
  let voltageFactor = 0.001;
  let timeFactor = 0.01;
  let totlozerFactor = 0.001;
  let voltage = extractByts(hexValue, 6, 7) * voltageFactor;
  let time = extractByts(hexValue, 8, 9) * timeFactor;
  let totlozer = extractByts(hexValue, 11, 15) * totlozerFactor;

  res.status(StatusCodes.OK).json({ voltage, time, totlozer });
};

module.exports = { sendData };
