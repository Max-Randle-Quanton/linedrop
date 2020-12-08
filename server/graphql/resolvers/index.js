const bcrypt = require("bcryptjs");

// import mongoose models
const Event = require("../../models/event");
const User = require("../../models/user");

// database operations
const events = async () => {
  try {
    const events = await Event.find();
    return events.map((event) => ({
      ...event._doc,
      date: new Date(event._doc.date).toISOString(),
      creator: () => findUserById(event._doc.creator),
    }));
  } catch (err) {
    throw err;
  }
};

const findEventsByIds = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => ({
      ...event._doc,
      date: new Date(event._doc.date).toISOString(),
    }));
  } catch (err) {
    throw err;
  }
};

const dummyUser = "5fcd8d2660820e55b8d0c272";

const createEvent = async (args) => {
  try {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: dummyUser, // hard code for now
    });
    const createdEvent = await event.save();
    // update the createdEvents list for the user that created the event
    const creator = await User.findById(dummyUser); // hard code for now
    if (!creator) {
      throw new Error("User not found");
    }
    creator.createdEvents.push(createdEvent);
    await creator.save();
    return {
      ...createdEvent._doc,
      creator: () => findUserById(createdEvent._doc.creator),
    };
  } catch (err) {
    throw err;
  }
};

const users = async () => {
  try {
    return await User.find();
  } catch (err) {
    throw err;
  }
};

const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      createdEvents: () => findEventsByIds(user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

const createUser = async (args) => {
  try {
    // check username exists already
    const user = await User.findOne({ username: args.userInput.username });
    if (user) {
      throw new Error("Username is taken.");
    }
    // generate password hash
    const passwordHash = await bcrypt.hash(args.userInput.password, 12);
    const newUser = new User({
      username: args.userInput.username,
      password: passwordHash,
    });
    // save user as a document in the users collection
    const createdUser = await newUser.save();
    // obscure password hash before returning
    return { ...createdUser._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const resolvers = {
  // resolvers for Event
  events,
  createEvent,

  // resolvers for User
  users,
  createUser,
};

module.exports = resolvers;
