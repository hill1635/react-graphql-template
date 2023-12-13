const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { userTypeDefs, userResolvers } = require('./schemas/user');

const typeDefs = mergeTypeDefs([userTypeDefs]);
const resolvers = mergeResolvers([userResolvers]);

module.exports = { typeDefs, resolvers };