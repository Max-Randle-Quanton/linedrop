const Group = require("../../models/group");
const User = require("../../models/user");
const { enrichGroup, enrichMessage } = require("./merge");

const findGroupsForCurrentUser = async (args, req) => {
  try {
    if (!req.isAuth) {
      throw new Error("Unauthenticated request to a restricted resource.");
    }
    const user = await User.findById(req.userId);
    const groups = await Group.find({ _id: { $in: user.groups } });
    return groups.map((group) => enrichGroup(group));
  } catch (err) {
    throw err;
  }
};

const createGroup = async ({ members }, req) => {
  try {
    if (!req.isAuth) {
      throw new Error("Unauthenticated request to a restricted resource.");
    }
    if (!members.includes(req.userId)) {
      members = [...members, req.userId]; // add the user who created it into the group
    }
    // get distinct members array
    members = members.filter((value, index, self) => self.indexOf(value) === index);
    const newGroup = new Group({
      members,
      messages: [],
    });
    const user = await User.findById(req.userId);
    const createdGroup = await newGroup.save();
    user.groups.push(createdGroup);
    await user.save();
    return enrichGroup(createdGroup);
  } catch (err) {
    throw err;
  }
};

const createMessage = async ({ groupId, text }, req) => {
  try {
    if (!req.isAuth) {
      throw new Error("Unauthenticated request to a restricted resource.");
    }
    const user = User.findById(req.userId);
    if (!user.groups.includes(req.userId)) {
      throw new Error("User does not belong to the target group.");
    }
    const group = await Group.findById(groupId);
    group.messages.push({ author: req.userId, text });
    const returnedGroup = await group.save();
    const [createdMessage] = returnedGroup.messages.slice(-1);
    return enrichMessage(createdMessage);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  groups: findGroupsForCurrentUser,
  createGroup,
  createMessage,
};
