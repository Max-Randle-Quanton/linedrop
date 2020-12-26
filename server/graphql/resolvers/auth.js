const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const { enrichUser } = require("./merge");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecretString = process.env.JWT_SECRET_STRING;

const findAllUsers = async (args, req) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated request to a restricted resource.");
  }
  try {
    const users = await User.find();
    return users.map((user) => enrichUser(user));
  } catch (err) {
    throw err;
  }
};

const createUser = async ({ username, password }) => {
  try {
    // check username exists already
    const user = await User.findOne({ username });
    if (user) {
      throw new Error("Username is taken.");
    }
    // generate password hash
    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      password: passwordHash,
    });
    // save user as a document in the users collection
    const createdUser = await newUser.save();
    return enrichUser(createdUser);
  } catch (err) {
    throw err;
  }
};

const login = async ({ username, password }) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User does not exist");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error("Invalid credentials.");
    }

    // generate a token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      jwtSecretString,
      { expiresIn: "12h" }
    );

    return { userId: user.id, username, token, tokenExpiration: 12 };
  } catch (err) {
    throw err;
  }
};

const verifyJwt = async ({ token }, req) => {
  if (!req.isAuth) {
    throw new Error("Invalid Token");
  }
  try {
    const user = await User.findById(req.userId);
    return enrichUser(user);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  users: findAllUsers,
  createUser,
  login,
  verifyJwt,
};
