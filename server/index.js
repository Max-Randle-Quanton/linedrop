const express = require("express");
const yup = require("yup");
const monk = require("monk");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

// constants
const __prod__ = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 5000;
const DATABASE_URI = process.env.MONGODB_URI;

// db connection

const app = express();

// serve staic html
app.use(express.static("build"));

// middleware
app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// todo: graphql api

app.listen(PORT, () => console.log("server listening over port", PORT));
