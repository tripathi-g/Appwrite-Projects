// const sdk = require("node-appwrite");

// /*
//   'req' variable has:
//     'headers' - object with request headers
//     'payload' - request body data as a string
//     'variables' - object with function variables

//   'res' variable has:
//     'send(text, status)' - function to return text response. Status code defaults to 200
//     'json(obj, status)' - function to return JSON response. Status code defaults to 200

//   If an error is thrown, a response with code 500 will be returned.
// */

// module.exports = async function (req, res) {
//   const client = new sdk.Client();

//   // You can remove services you don't use

//   if (
//     !req.variables["APPWRITE_FUNCTION_ENDPOINT"] ||
//     !req.variables["APPWRITE_FUNCTION_API_KEY"]
//   ) {
//     console.warn(
//       "Environment variables are not set. Function cannot use Appwrite SDK."
//     );
//   } else {
//     console.log("env set properly");

//     // client
//     //   .setEndpoint(req.variables["APPWRITE_FUNCTION_ENDPOINT"])
//     //   .setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
//     //   .setKey(req.variables["APPWRITE_FUNCTION_API_KEY"])
//     //   .setSelfSigned(true);

//     console.log(req.variables["APPWRITE_FUNCTION_API_KEY"]);
//     console.log(req.variables["APPWRITE_FUNCTION_TEAMA_ID"]);
//     console.log(req.variables["APPWRITE_FUNCTION_REDIRECT_URL"]);
//     console.log(req.variables["APPWRITE_FUNCTION_PROJECT_ID"]);
//     console.log(req.variables["APPWRITE_FUNCTION_ENDPOINT"]);

//     res.send("ad..asd");

//     // res.send("Happy Happy");
//   }
// };

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

  // You can remove services you don't use
  const teams = new sdk.Teams(client);

  if (
    !req.variables["APPWRITE_FUNCTION_API_KEY"] ||
    !req.variables["APPWRITE_FUNCTION_TEAMA_ID"] ||
    !req.variables["APPWRITE_FUNCTION_REDIRECT_URL"] ||
    !req.variables["APPWRITE_FUNCTION_PROJECT_ID"] ||
    !req.variables["APPWRITE_FUNCTION_ENDPOINT"]
  ) {
    console.log(
      "Environment variables are not set. Function cannot use Appwrite SDK."
    );
    res.json("Env not set function ended");
  } else {
    client
      .setEndpoint("https://appwrite/v1")
      .setProject("64eb1f41c5f0f30ab422")
      .setKey(
        "7ae9ee6c0ee2341bb72e5396c913b5842f57a4d20c676ed3ea9d0f8098027c7f6f0a78c323f2af40aba8b734adab3c6ca68d9abf10dd9606b4786846fd3d7c130c1d5e1e1822027ed260beefc906d72f21c43d8de73e95f719ed2a28c87718926a4eab654c6e521b91b139c164df3cd478a9a9233e5a46bcf1aaa4cc55330558"
      )
      .setSelfSigned(true);

    console.log("env are set");

    // const payload = JSON.parse(req.payload);
    // const email = payload.email;
    // const promise = teams.createMembership(
    //   req.variables["APPWRITE_FUNCTION_TEAMA_ID"],
    //   [],
    //   req.variables["APPWRITE_FUNCTION_REDIRECT_URL"],
    //   email
    // );

    const promise = teams.createMembership(
      "64f05599c650ae161a75",
      [],
      "https://authapplocal.stripathi.tech",
      "testiasdnasdg@gmail.com"
    );

    promise.then(
      function (response) {
        console.log(response);
        res.json({ added: true });
      },
      function (error) {
        console.log(error);
        res.json({ added: false });
      }
    );
  }
};
