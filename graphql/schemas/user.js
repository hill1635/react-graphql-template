const { gql } = require('apollo-server-express');
const { prisma } = require('../../prisma/db');

const userTypeDefs = gql`
    type User {
        _id: ID
        name: String
        email: String
        password: String
    }

    type Query {
        findUser: User
        all: [User]
    }

    type Mutation {
        createUser(email: String!, password: String!): User
    }
`;

const userResolvers = {
    Query: {
        findUser: (parent, args) => {
            var user = prisma.user.findUnique({
                where: {
                    email: args.email
                },
            });
            return user;
        },
        all: (parent, args) => {
            var dbUsers = prisma.user.findMany({});
            return dbUsers;
        }
    },
    // Write a resolver that creates a new user
    Mutation: {
        createUser: async (parent, args) => {
            const { email, password } = args;
            const newUser = await prisma.user.create({
                data: {
                    email,
                    password
                }
            });
            console.log(newUser);
            return newUser;
        }
    }
};

module.exports = { userTypeDefs, userResolvers };