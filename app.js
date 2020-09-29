// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
app.use(express.static(path.join(__dirname + "/public/")));

// routes setting
app.get("/", async (req, res) => {
  console.log('OK')
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});