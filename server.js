const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString } = graphql;

const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: {
            type: UserType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return User.findAll({ where: args });
            }
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                return User.create({
                    name: args.name,
                    email: args.email,
                    password: args.password,
                });
            },
        },
    },
});

const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

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

// app.use(session(sess));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// app.use(routes);

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1/react-graqhql-template");

app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});