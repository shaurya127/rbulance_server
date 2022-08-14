const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./config/config.env" });
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const { db } = require("./models/hospitalsModel");
const connectDatabase = require("./config/database");
const Cors = require("cors");
const errorMiddleware = require("./middleware/error");


app.use(Cors());
app.use(jsonParser);
app.use(urlencodedParser);


connectDatabase();


const hospitals = require("./routes/getLocation");
const user = require("./routes/userRoutes");


app.use("/api/v1", hospitals);
app.use("/api/v1", user);

app.use(errorMiddleware);


module.exports = app;
