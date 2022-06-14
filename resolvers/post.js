const posts = require("../temp");

// query generics
const totalPosts = () => posts.length;
const allPosts = () => posts;

// mutations
const newPost = (parent, args) => {
  const post = {
    id: posts.length + 1,
    ...args.input,
  };
  // push new post
  posts.push(post);
  return post;
};

module.exports = {
  Query: {
    totalPosts,
    allPosts,
  },
  Mutation: {
    newPost,
  },
};
