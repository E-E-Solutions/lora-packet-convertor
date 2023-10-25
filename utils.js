const base64 = require("base64-js");
const parseHexadecimalString = (encodedString) => {

  const bytesData = base64.toByteArray(encodedString);

  const hexString = Buffer.from(bytesData).toString("hex");

  console.log(hexString, "hex_stringhex_stringhex_stringhex_string");
  const byt1011 = hexString[10] + hexString[11];

  const byt1213 = hexString[12] + hexString[13];

  const byt1415 = hexString[14] + hexString[15];

  const byt1617 = hexString[16] + hexString[17];

  const byt1819 = hexString[18] + hexString[19];

  const readingByt = byt1819 + byt1617 + byt1415 + byt1213;

  let forwardTotalizer;
  if (byt1011 === "2b") {
    const readingg = parseInt(readingByt) * 0.001;
    forwardTotalizer = Math.floor(readingg * 100) / 100;
  } else if (byt1011 === "2c") {
    const readingg = parseInt(readingByt) * 0.01;
    forwardTotalizer = Math.floor(readingg * 100) / 100;
  } else if (byt1011 === "2d") {
    const readingg = parseInt(readingByt) * 0.1;
    forwardTotalizer = Math.floor(readingg * 100) / 100;
  } else if (byt1011 === "2e") {
    const readingg = parseInt(readingByt) * 1;
    forwardTotalizer = Math.floor(readingg * 100) / 100;
  } else {
    forwardTotalizer = "Invalid Byte";
    rp_status = "Invalid Byte";
    d_reading = 0;
  }

  let BateryVoltage = hexString[24] + hexString[25];
  BateryVoltage = Math.floor((parseInt(BateryVoltage, 16) / 253) * 100);
  if (BateryVoltage > 100) {
    BateryVoltage = 100;
  }
  console.log({ BateryVoltage, forwardTotalizer });
  return { BateryVoltage, forwardTotalizer };
};

const parseHexDecimalStrForBelow50mm = (encodedString)=>{
  const bytesData = base64.toByteArray(encodedString);
  const hexString = Buffer.from(bytesData).toString("hex");
  console.log(hexString, "hex_stringhex_stringhex_stringhex_string");
  const forwardTotalizer = 
}

module.exports = { parseHexadecimalString };
