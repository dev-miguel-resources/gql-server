const { gql } = require("apollo-server-express");

module.exports = gql`
  type Post {
    id: ID!
    content: String
    image: Image
    postedBy: User
  }
  input PostCreateInput {
    content: String!
    image: ImageInput
  }
  # query generics
  type Query {
    allPosts: [Post!]!
    postsByUser: [Post!]!
  }
  # mutation
  type Mutation {
    createPost(input: PostCreateInput!): Post!
  }
`;
