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
        me: User
        all: [User]
    }
`;

const userResolvers = {
    Query: {
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
};

module.exports = { userTypeDefs, userResolvers };