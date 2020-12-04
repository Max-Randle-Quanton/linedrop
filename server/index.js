const express = require("express");
const yup = require("yup");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
require("dotenv").config();

// constants
const __prod__ = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 5000;
const DATABASE_URI = process.env.MONGODB_URI;

const app = express();

// dev stuff, delete later
const events = [];

// middleware
app.use(cors());
app.use(helmet({ contentSecurityPolicy: __prod__ ? undefined : false }));
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// db connection
// mongoose
//   .connect(DATABASE_URI, { useNewUrlParser: true })
//   .then(() => console.log("MongoDB successfully connected"))
//   .catch((err) => console.log(err));

// serve staic html
app.use(express.static("build"));

// graphql api
app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }   

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: (args) => {
        const event = {
          _id: Math.random().toString(),
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: args.eventInput.date,
        };
        events.push(event);
        return event;
      },
    },
    graphiql: true,
  })
);

// start server
app.listen(PORT, () => console.log("server listening over port", PORT));
