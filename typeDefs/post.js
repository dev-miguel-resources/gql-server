const { gql } = require("apollo-server-express");

module.exports = gql`
  type Post {
    _id: ID!
    content: String
    image: Image
    postedBy: User 
  }
  input PostCreateInput {
    content: String!
    image: ImageInput
  } 
  type Query {
    totalPosts: Int!
    allPosts(page: Int): [Post!]!
    postsByUser: [Post!]!
    search(query: String): [Post]
  }
  type Mutation {
    postCreate(input: PostCreateInput!): Post!
  }
`;