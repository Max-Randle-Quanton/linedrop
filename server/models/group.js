const mongoose = require("mongoose");
const Message = require("./models/message");

const Schema = mongoose.Schema;

const groupSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: Message,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Group", groupSchema);
