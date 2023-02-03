const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
// const router = require("./routes/route1");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("server/public"));

// ROUTES
// app.use("/url", router);

// Start listening for requests on a specific port
app.listen(PORT, () => {
console.log("listening on port", PORT)
});