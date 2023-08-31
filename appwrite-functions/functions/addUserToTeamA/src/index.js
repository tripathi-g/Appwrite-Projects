const sdk = require("node-appwrite");

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  const client = new sdk.Client();

  if (
    !req.variables["APPWRITE_FUNCTION_ENDPOINT"] ||
    !req.variables["APPWRITE_FUNCTION_PROJECT_ID"] ||
    !req.variables["APPWRITE_FUNCTION_API_KEY"] ||
    !req.variables["APPWRITE_TEAM_ID"]
  ) {
    console.warn(
      "Environment variables are not set. Function cannot use Appwrite SDK."
    );
  } else {
    const payload = JSON.parse(req.payload);
    const email = payload.email;
    const JWT = payload.JWT;

    client
      .setEndpoint(req.variables["APPWRITE_FUNCTION_ENDPOINT"])
      .setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
      .setKey(req.variables["APPWRITE_FUNCTION_API_KEY"])
      .setSelfSigned(true);

    const teams = new sdk.Teams(client);

    teams
      .createMembership(
        req.variables["APPWRITE_TEAM_ID"],
        email,
        [],
        "https://authapplocal.stripathi.tech"
      )
      .then(
        (response) => {
          console.log(response);
          res.send("true", 200);
        },
        (error) => {
          console.error(error);
          res.send("false", 400);
        }
      );
  }
};
