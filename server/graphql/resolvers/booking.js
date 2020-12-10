const Booking = require("../../models/booking");
const Event = require("../../models/event");
const { enrichEvent, enrichBooking } = require("./merge");

const dummyUser = "5fd00e6692b78d454cc3ca47";

// database operations

const findAllBookings = async () => {
  try {
    const bookings = await Booking.find();
    return bookings.map((booking) => enrichBooking(booking));
  } catch (err) {
    throw err;
  }
};

const createBooking = async (args) => {
  try {
    const event = await Event.findById(args.eventId);
    const newBooking = new Booking({
      user: dummyUser,
      event: event,
    });
    const createdBooking = await newBooking.save();
    return enrichBooking(createdBooking);
  } catch (err) {
    throw err;
  }
};

const cancelBooking = async (args) => {
  try {
    const booking = await Booking.findById(args.bookingId);
    // const booking = await Booking.findById(args.bookingId).populate("event");
    if (!booking) {
      throw new Error("Booking not found.");
    }
    booking.delete();
    const event = enrichEvent(enrichBooking(booking).event);
    return event;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  bookings: findAllBookings,
  bookEvent: createBooking,
  cancelBooking,
};
