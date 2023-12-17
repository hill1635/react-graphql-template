const { gql } = require('apollo-server-express');
const { prisma } = require('../../prisma/db');

const userTypeDefs = gql`
    type User {
        _id: ID
        name: String
        email: String
        password: String
    }

    type UserQuery {
        me: User
        all: [User]
    }

    type UserMutation {
        createUser(email: String!, password: String!): User
    }
`;

const userResolvers = {
    UserQuery: {
        me: (parent, args) => {
            var me = prisma.user.findUnique({
                where: {
                    email: 'test@test.com'
                },
                select: {
                    name: true,
                    email: true
                }
            });
            return me;
        },
        all: (parent, args) => {
            var dbUsers = prisma.user.findMany({});
            return dbUsers;
        }
    },
    // Write a resolver that creates a new user
    UserMutation: {
        create: async (parent, args) => {
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