const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const port = 8080;

const sdk = require("node-appwrite");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/addusertoteam", bodyParser.json(), (req, res) => {
  const client = new sdk.Client();
  const email = req.body.email;
  console.log(email);

  console.log("add user alled");
  client
    .setEndpoint("https://appwrite/v1")
    .setProject("64eb1f41c5f0f30ab422")
    .setKey(
      "7ae9ee6c0ee2341bb72e5396c913b5842f57a4d20c676ed3ea9d0f8098027c7f6f0a78c323f2af40aba8b734adab3c6ca68d9abf10dd9606b4786846fd3d7c130c1d5e1e1822027ed260beefc906d72f21c43d8de73e95f719ed2a28c87718926a4eab654c6e521b91b139c164df3cd478a9a9233e5a46bcf1aaa4cc55330558"
    )
    .setSelfSigned(true);

  const teams = new sdk.Teams(client);

  const promise = teams.createMembership(
    "64f05599c650ae161a75",
    [],
    "https://authapplocal.stripathi.tech",
    "testiasdng@gmail.com"
  );

  //   const promise = teams.listMemberships("64ee6177064161c4e801");
  promise.then(
    function (response) {
      console.log(response);
      res.json({ added: true });
    },
    function (error) {
      console.log(error.message);
      res.json({ added: false });
    }
  );
});

app.listen(port, () => {
  console.log("Server Listening");
});
