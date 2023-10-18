const Convertor = (arr) => {
  const hexValues = arr.map((num) => num.toString(16).padStart(2, "0")); // Added padding
  const hexString = hexValues.join("");
  return parseInt(hexString, 16);
};

// const timeConvertor = (time) => {
//   const hexValues = time.map((num) => num.toString(16).padStart(2, "0"));
//   return hexValues.join(":");
// };

const parseHexadecimalString = (encodedString) => {
  const decodedBuffer = Buffer.from(encodedString, "base64");
  const totalizerBytes = Array.from(
    { length: 5 },
    (_, index) => decodedBuffer[11 + index]
  );

  const forwardTotalizer = (totalizerBytes.join("") * 0.00001).toFixed(5);

  // Battary voltage ..............
  const decodedVolt = (decodedBuffer[6] << 8) | decodedBuffer[7];
  const BatteryVoltage = (decodedVolt * 0.001).toFixed(3);
  console.log("Battery : ", BatteryVoltage);
  // const time = Array.from(
  //   { length: 2 },
  //   (_, index) => decodedBuffer[8 + index]
  // );

  // const supplyTime = timeConvertor(time);
  console.log({ BatteryVoltage, forwardTotalizer });

  return { BatteryVoltage, forwardTotalizer };
};

module.exports = { parseHexadecimalString };
