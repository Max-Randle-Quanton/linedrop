// for merging data types together based on their relationships

const User = require("../../models/user");
const Event = require("../../models/event");
const { dbDateToString } = require("../../helpers");

// every document that is sent out must be passed through an enrich function
// the enrich functions have 3 important jobs:
// populate links within a document with the document that they are referencing
// map some database types into more easily consumable ones
// sterilise document of any sensitive data before it is sent out

const enrichUser = (user) => ({
  ...user._doc,
  password: null, // obscure password hash
  groups: null, // obscure groups
  createdEvents: () => findEventsByIds(user._doc.createdEvents),
});

const enrichGroup = (group) => ({
  ...group._doc,
  members: () => findUsersByIds(group._doc.members),
  messages: group._doc.messages.map((message) => enrichMessage(message)),
});

const enrichMessage = (message) => ({
  ...message._doc,
  author: () => findUserById(message._doc.author),
  createdAt: dbDateToString(message._doc.createdAt),
  updatedAt: dbDateToString(message._doc.updatedAt),
});

const enrichEvent = (event) => ({
  ...event._doc,
  date: dbDateToString(event._doc.date),
  creator: () => findUserById(event._doc.creator),
});

const enrichBooking = (booking) => ({
  ...booking._doc,
  user: () => findUserById(booking._doc.user),
  event: () => findEventById(booking._doc.event),
  createdAt: dbDateToString(booking._doc.createdAt),
  updatedAt: dbDateToString(booking._doc.updatedAt),
});

const findUsersByIds = async (userIds) => {
  try {
    const users = await User.find({ _id: { $in: userIds } });
    return users.map((user) => enrichUser(user));
  } catch (err) {
    throw err;
  }
};

const findEventById = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return enrichEvent(event);
  } catch (err) {
    throw err;
  }
};

const findEventsByIds = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => enrichEvent(event));
  } catch (err) {
    throw err;
  }
};

const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return enrichUser(user);
  } catch (err) {
    throw err;
  }
};

exports.enrichUser = enrichUser;
exports.enrichGroup = enrichGroup;
exports.enrichEvent = enrichEvent;
exports.enrichBooking = enrichBooking;
exports.enrichMessage = enrichMessage;
