// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
app.use(express.static(path.join(__dirname + "/public")));

// connect mongoDB
require("./server/models/config/dbcon.js");

// view routes
app.use("/", [require("./server/routers/weather_router")]);

// API routes
app.use("/api/1.0", [require("./server/api/weather_api")]);

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});