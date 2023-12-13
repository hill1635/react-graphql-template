const { gql } = require('apollo-server-express');

const resolvers = {
    Query: {
        hello: () => 'Hello world!'
    }
};

module.exports = resolvers;