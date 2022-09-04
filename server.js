const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Pusher = require('pusher');
const dotenv = require("dotenv")
const app = express();

dotenv.config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const connection = require("./config/database")
const UserRoutes = require("./Routes/UserRoutes")

app.use("/user",UserRoutes)

const port = process.env.PORT || 9000;

app.listen(port,() => console.log("Server started on PORT 9000"));
