const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { graphqlHTTP } = require("express-graphql");
require("dotenv").config();

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

// constants
const __prod__ = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 5000;
const DATABASE_URI = process.env.MONGODB_URI;

const app = express();

// middleware
app.use(cors());
app.use(helmet({ contentSecurityPolicy: __prod__ ? undefined : false }));
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// serve staic html
app.use(express.static("build"));

// endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

// database connect > server start
mongoose
  .connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB successfully connected");
    app.listen(PORT, () => console.log("server listening over port", PORT));
  })
  .catch((err) => console.log(err));
