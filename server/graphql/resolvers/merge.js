// for merging data types together based on their relationships

const Event = require("../../models/event");
const User = require("../../models/user");
const { dbDateToString } = require("../../helpers");

// the transform functions populate links within a document with the rich document data that they are referencing
// they also map some database types into more easily consumable ones, eg dbDate in milliseconds to an ISO string
const transformUser = (user) => ({
  ...user._doc,
  password: null,
  createdEvents: () => findEventsByIds(user._doc.createdEvents),
});

const transformEvent = (event) => ({
  ...event._doc,
  date: dbDateToString(event._doc.date),
  creator: () => findUserById(event._doc.creator),
});

const transformBooking = (booking) => ({
  ...booking._doc,
  user: () => findUserById(booking._doc.user),
  event: () => findEventById(booking._doc.event),
  createdAt: dbDateToString(booking._doc.createdAt),
  updatedAt: dbDateToString(booking._doc.updatedAt),
});

const findEventById = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (err) {
    throw err;
  }
};

const findEventsByIds = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => transformEvent(event));
  } catch (err) {
    throw err;
  }
};

const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return transformUser(user);
  } catch (err) {
    throw err;
  }
};

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
exports.transformUser = transformUser;
