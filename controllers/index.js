const router = require('express').Router();
const { GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLInt, GraphQLList, GraphQL, GraphQLSchema } = require('graphql');
const GraphQLDate = require('graphql-date');
const graphqlHTTP = require('express-graphql');
const Models = require('../models');

const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    mobile: { type: GraphQLString },
    dob: { type: GraphQLDate },
  }),
});
const Post = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    text: { type: GraphQLString },
    CreatedById: { type: GraphQLInt },
    postType: { type: GraphQLString },
    OriginalPostId: { type: GraphQLInt },
  }),
});
const Friend = new GraphQLObjectType({
  name: 'Friend',
  fields: () => ({
    isAccepted: { type: GraphQLBoolean },
    RequestedById: { type: GraphQLInt },
    RequestedToId: { type: GraphQLInt },
  }),
});
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      users: {
        type: new GraphQLList(User),
        resolve: (parent, args) => {
          return Models.User.User.findAll().then(data => data);
        },
      },
      posts: {
        type: new GraphQLList(Post),
        resolve: () => {
          return Models.Post.Post.findAll().then(data => data);
        },
      },
      friends: {
        type: new GraphQLList(Friend),
        resolve: () => {
          return Models.Friend.Friend.findAll().then(data => data);
        },
      },
    },
  }),
});
router.use(
  '/',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
module.exports = router;
