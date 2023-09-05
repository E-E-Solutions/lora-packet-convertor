const db = require("./database");

module.exports = class Device {
  constructor(
    deviceId,
    deviceui,
    deviceName,
    voltageValue,
    timeValue,
    totalizerValue
  ) {
    this.deviceId = deviceId;
    this.deviceui = deviceui;
    this.deviceName = deviceName;
    this.voltageValue = voltageValue;
    this.totalizerValue = totalizerValue;
    this.timeValue = timeValue;
  }
  save() {
    return db
      .execute(
        "INSERT INTO Lora (deviceui, deviceName, voltageValue, timeValue, totalizerValue) VALUES (?, ?, ?, ?, ?)",
        [
          this.deviceui,
          this.deviceName,
          this.voltageValue,
          this.timeValue,
          this.totalizerValue,
        ]
      )
      .catch((error) => {
        console.error(error);
      });
  }
  // find by email ....
  static findWithDeciceId(deviceui) {
    return db.execute("SELECT * FROM Lora WHERE deviceui = ?", [deviceui]);
  }
  // update field by id ....
  static updateById(voltageValue, timeValue, totalizerValue, deviceui) {
    return db.execute(
      "UPDATE Lora SET voltageValue = ?, timeValue = ?, totalizerValue = ? WHERE deviceui = ?",
      [voltageValue, timeValue, totalizerValue, deviceui]
    );
  }
  // delete fields by id .....
  static deleteByEmail(id) {
    return db.execute("DELETE FROM  Lora WHERE email = ? ", [id]);
  }
};
