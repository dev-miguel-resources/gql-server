const { authCheck } = require("../middlewares/auth");
const Post = require("../models/post");
const User = require("../models/user");

const postCreate = async (_, args, { req }) => {
  const currentUser = await authCheck(req);
  if (args.input.content.trim() === "") {
    throw new Error("Content is required");
  }
  const currentUserFromDB = await User.findOne({
    email: currentUser.email,
  });
  let newPost = await new Post({
    ...args.input,
    postedBy: currentUserFromDB._id,
  })
    .save()
    .then((post) => post.populate("postedBy", "_id username").execPopulate());

  return newPost;
};

const allPosts = async (_, args) => {
  return await Post.find({})
    .populate("postedBy", "username _id")
    .sort({ createdAt: 1 })
    .exec();
};

const postsByUser = async (_, args, { req }) => {
  const currentUser = await authCheck(req);
  const currentUserFromDb = await User.findOne({
    email: currentUser.email,
  }).exec();
  return await Post.find({ postedBy: currentUserFromDb })
    .populate("postedBy", "_id username")
    .sort({ createdAt: -1 });
};

module.exports = {
  Query: {
    allPosts,
    postsByUser,
  },
  Mutation: {
    postCreate,
  },
};
