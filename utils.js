function hexToDecimal(hex) {
  return parseInt(hex, 16);
}

// parse
function parseHexadecimalString(hexString) {
  console.log(hexString);
  const otherInfo = hexString.slice(0, 7);
  const voltageValue = hexToDecimal(hexString.slice(7, 9)) * 0.01;
  let timeValue = hexToDecimal(hexString.slice(9, 11)) * 0.01;
  const totalizerValue = hexToDecimal(hexString.slice(11, 16)) * 0.001;

  return {
    voltageValue,
    timeValue,
    totalizerValue,
  };
}

module.exports = { hexToDecimal, parseHexadecimalString };
