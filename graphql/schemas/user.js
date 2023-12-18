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
        login: (parent, args, { req, res }) => {
            var user = prisma.user.findUnique({
                where: {
                    email: args.email
                },
            }).then((user) => {
                if (!user) {
                    res.status(400);
                    return res.status(400).send({ message: "Email is incorrect." });
                  }
                if (!bcrypt.compareSync(args.password)) {
                    return res.status(400).send({ message: "Password is invalid." });
                }
                console.log("user:", user);
                // req.session.save(() => {
                //     req.session.loggedIn = true;
                //     req.session.userId = dbModel[0]._id;
                //     res.status(200).json({ user: req.body.email });
                //   });
            }).catch((e) => {res.status(500).json(e)});
            // return user;
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