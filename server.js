const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { readdirSync } = require("fs");
require("dotenv").config();
const cors = require("cors")
const connectDB = require("./database");
//const bodyParser = require("body-parser"); // deprecated > 12

// express server
const app = express();

//db-connection
connectDB();

// middlewares express
app.use(cors());
app.use(express.json({ limit: "5mb" }));

// middlewares routes express
readdirSync("./rest").map((r) => app.use("/api", require("./rest/" + r)));

// type-defs

// resolvers

// apollo-server config / sign

// vinculation apollo-server with express

// server listen
app.listen(process.env.PORT, function() {
    console.log(`server is ready at http:localhost:${process.env.PORT}`);
});




