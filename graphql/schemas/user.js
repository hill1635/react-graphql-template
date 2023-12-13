const { gql } = require('apollo-server-express');

const users = [
    {
        _id: 1,
        username: "me",
        email: "me@me.com",
        password: "password"
    },
    {
        _id: 2,
        username: "you",
        email: "you@you.com",
        password: "password"
    },
    {
        _id: 3,
        username: "them",
        email: "them@them.com",
        password: "password"
    }
];

const userTypeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
    }

    type Query {
        me: User
        all: [User]
    }
`;

const userResolvers = {
    Query: {
        me: (parent, args) => {
            let me
            users.forEach(user => {
                if (user.username == "me") {
                    me = user;
                }
            });
            return me;
        },
        all: (parent, args) => {
            return users;
        }
    },
};

module.exports = { userTypeDefs, userResolvers };