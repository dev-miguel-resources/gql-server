const shortid = require("shortid");
const { authCheck } = require("../middlewares/auth");
const User = require("../models/user");

const me = async (_, args, { req, res }) => {
  await authCheck(req, res);
  return "Miguel";
};

const userCreate = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);
  const user = await User.findOne({ email: currentUser.email });
  return user
    ? user
    : new User({
        email: currentUser.email,
        username: shortid.generate(),
      }).save();
};

const userUpdate = async (_, args, { req }) => {
  const currentUser = await authCheck(req);
  console.log(args);
  const updateUser = await User.findOneAndUpdate(
    { email: currentUser.email },
    { ...args.input },
    { new: true }
  ).exec();
  return updateUser;
};

const allUsers = async (parent, args) => await User.find({}).exec();

const profile = async (_, args, { req }) => {
  const currentUser = await authCheck(req);
  return await User.findOne({ email: currentUser.email }).exec();
};

const publicProfile = async (_, args, { req }) => {
  return await User.findOne({ username: args.username }).exec();
};

module.exports = {
  Query: {
    me,
    allUsers,
    profile,
    publicProfile,
  },
  Mutation: {
    userCreate,
    userUpdate,
  },
};
