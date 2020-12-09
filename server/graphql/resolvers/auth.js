const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const { transformUser } = require("./merge");

const findAllUsers = async () => {
  try {
    const users = await User.find();
    return users.map((user) => transformUser(user));
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

module.exports = {
  users: findAllUsers,
  createUser,
};
