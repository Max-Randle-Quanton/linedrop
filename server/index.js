const express = require("express");
const yup = require("yup");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// import mongoose models
const Event = require("./models/event");
const User = require("./models/user");

// constants
const __prod__ = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 3000;
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

// graphql api
const schema = buildSchema(`
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        creator: User!
    }

    type User {
      _id: ID!
      email: String!
      password: String
      createdEvents: [Event!]
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input UserInput {
      email: String!,
      password: String!
    }

    type RootQuery {
        events: [Event!]!
        users: [User!]!
    }   

    type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

const user = (userId) =>
  User.findById.then().catch((err) => {
    throw err;
  });

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: {
      // resolvers for Event
      events: async () => {
        try {
          return await Event.find().populate("creator");
        } catch (err) {
          console.log(err);
        }
      },
      createEvent: async (args) => {
        try {
          const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: "5fcd8d2660820e55b8d0c272", // hard code for now
          });
          const createdEvent = await event.save();
          // update the createdEvents list for the user that created the event
          const creator = await User.findById("5fcd8d2660820e55b8d0c272"); // hard code for now
          if (!creator) {
            throw new Error("User not found");
          }
          creator.createdEvents.push(createdEvent);
          await creator.save();
          return createdEvent;
        } catch (err) {
          throw err;
        }
      },

      // resolvers for User
      users: async () => {
        try {
          return await User.find();
        } catch (err) {
          console.log(err);
        }
      },
      createUser: async (args) => {
        try {
          // check email exists already
          const user = await User.findOne({ email: args.userInput.email });
          if (user) {
            throw new Error("Email address already registered.");
          }
          // generate password hash
          const passwordHash = await bcrypt.hash(args.userInput.password, 12);
          const newUser = new User({
            email: args.userInput.email,
            password: passwordHash,
          });
          // save user as a document in the users collection
          const createdUser = await newUser.save();
          // obscure password before returning
          return { ...createdUser._doc, password: null };
        } catch (err) {
          throw err;
        }
      },
    },
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
