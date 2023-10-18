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
      username == "testuser@enggenv.com" &&
      password == "KerjSH9nu0kLnZFFDGKinzB7OXkF2tB0"
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
