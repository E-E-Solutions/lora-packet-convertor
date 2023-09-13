// function for check auth
function checkForAuth(res, next, authHeader) {
  if (authHeader) {
    const encodedCredentials = authHeader.split(" ")[1];
    const decodedCredentials = Buffer.from(
      encodedCredentials,
      "base64"
    ).toString("utf-8");
    const [username, password] = decodedCredentials.split(":");

    if (
      username === process.env.LORA_USER &&
      password === process.env.LORA_PASSWORD
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
module.exports = { checkForAuth };
