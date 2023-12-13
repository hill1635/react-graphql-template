const { userTypeDefs, userResolvers } = require('./schemas/user');

const typeDefs = userTypeDefs;
const resolvers = userResolvers;

module.exports = { typeDefs, resolvers };