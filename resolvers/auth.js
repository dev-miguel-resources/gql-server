const { authCheck } = require("../middlewares/auth");
const User = require("../models/user");
const shortid = require("shortid");

const me = async (_, args, { req, res }) => {
  await authCheck(req, res);
  return "Miguel";
};

const userCreate = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);
  const user = await User.findOne({ email: currentUser.email });
  user 
    ? user
    : new User({
      email: currentUser.email,
      username: shortid.generate()
    }).save(); 
};

const allUsers = async (_, args) => await User.find({}).exec();

module.exports = {
  Query: {
    me,
    allUsers,
  },
  Mutation: {
    userCreate,
  },
};
