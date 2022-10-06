const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { readdirSync } = require("fs");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./database");
const path = require("path");

const app = express();

connectDB();

app.use(cors());
app.use(express.json({ limit: "5mb"}));

readdirSync("./rest").map((r) => app.use("/api", require("./rest/" + r)));

const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "./typeDefs"))
);

const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "./resolvers"))
);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

apolloServer.applyMiddleware({ app });

app.listen(process.env.PORT, function () {
  console.log(`server is ready at http:localhost:${process.env.PORT}`);
  console.log(`graphql server is ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`);
});