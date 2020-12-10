const Event = require("../../models/event");
const User = require("../../models/user");
const { enrichEvent } = require("./merge");

const dummyUser = "5fd00e6692b78d454cc3ca47";

const findAllEvents = async () => {
  try {
    const events = await Event.find();
    return events.map((event) => enrichEvent(event));
  } catch (err) {
    throw err;
  }
};

const createEvent = async (args) => {
  try {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: args.eventInput.date,
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
    return enrichEvent(createdEvent);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  events: findAllEvents,
  createEvent: createEvent,
};
