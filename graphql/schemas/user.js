const { gql } = require('apollo-server-express');
const { prisma } = require('../../prisma/db');
const bcrypt = require('bcrypt');

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
            const password = bcrypt.hashSync(args.password, 10);
            const email = args.email;
            const newUser = await prisma.user.create({
                data: {
                    email,
                    password
                }
            }).catch((e) => {
                console.log(e);
            });
            return newUser;
        }
    }
};

module.exports = { userTypeDefs, userResolvers };