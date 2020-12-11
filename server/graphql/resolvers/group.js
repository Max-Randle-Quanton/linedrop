const Group = require("../../models/group");
const User = require("../../models/user");
const { enrichGroup } = require("./merge");

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
    const newGroup = new Group({
      members: [...members, req.userId], // add the user who created it into the group
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

module.exports = {
  groups: findGroupsForCurrentUser,
  createGroup,
};
