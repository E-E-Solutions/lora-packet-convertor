const { StatusCodes } = require("http-status-codes");
const { checkForAuth } = require("./authorizatoin");
// Function to extract specific bits from a hexadecimal value
// hex to decimal
function hexToDecimal(hex) {
  return parseInt(hex, 16);
}

// parse
function parseHexadecimalString(hexString) {
  const otherInfo = hexString.slice(0, 8);
  const voltageValue = hexToDecimal(hexString.slice(8, 12));
  const timeValue = hexToDecimal(hexString.slice(12, 16));
  const totalizerValue = hexToDecimal(hexString.slice(16));

  return {
    voltageValue,
    timeValue,
    totalizerValue,
  };
}

// send data
const sendData = (req, res, next) => {
  const body = req.body;
  const authHeader = req.headers.authorization;
  checkForAuth(res, next, authHeader);
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
  const { voltageValue, timeValue, totalizerValue } =
    parseHexadecimalString(hexValue);

  res.status(StatusCodes.OK).json({ voltageValue, timeValue, totalizerValue });
};
module.exports = { sendData };
