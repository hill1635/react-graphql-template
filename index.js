const { ApolloServer } = require('apollo-server');
const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

const server = new ApolloServer({

});

server.listen()
    .then(({ url }) => 
        console.log(`Server is running on ${url}`)
    );