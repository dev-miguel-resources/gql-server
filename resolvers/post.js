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

const totalPosts = async () =>
  await Post.find({}).estimatedDocumentCount().exec();

const allPosts = async (_, args) => {
  const currentPage = args.page | 1;
  const perPage = 3;

  return await Post.find({})
    .skip((currentPage - 1) * perPage)
    .populate("postedBy", "username _id")
    .limit(perPage)
    .sort({ createdAt: -1 })
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

const search = async (_, { query }) => {
  return await Post.find({ $text: { $search: query } })
    .populate("postedBy", "username")
    .exec();
};

module.exports = {
  Query: {
    allPosts,
    postsByUser,
    totalPosts,
    search,
    allPosts,
  },
  Mutation: {
    postCreate,
  },
};
