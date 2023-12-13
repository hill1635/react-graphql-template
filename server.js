const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString } = graphql;
const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs, resolvers } = require("./graphql/index.js");

const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

let server = null;
async function startServer() {
    server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });
}
startServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sess = {
    secret: "secret",
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 1000,
    }),
};

app.use(session(sess));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// app.use(routes);

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1/react-graqhql-template");

app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    console.log(`gql path is http://localhost:3001${server.graphqlPath}`);
});