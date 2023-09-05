// function for check auth
function checkForAuth(res, next, authHeader) {
  if (authHeader) {
    const encodedCredentials = authHeader.split(" ")[1];
    const decodedCredentials = Buffer.from(
      encodedCredentials,
      "base64"
    ).toString("utf-8");
    const [username, password] = decodedCredentials.split(":");

    if (username === "testUser@ene" && password === "secret") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
module.exports = { checkForAuth };
