const router = require('express').Router();
const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQL,
  GraphQLSchema,
  GraphQLScalarType,
} = require('graphql');
const { Kind } = require('graphql/language');
const GraphQLDate = require('graphql-date');
const graphqlHTTP = require('express-graphql');
const Models = require('../models');
const user = require('../services/auth');
const services = require('../services');

const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    name: {
      type: GraphQLString,
    },
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
    isActive: { type: GraphQLBoolean },
  }),
});
const Friend = new GraphQLObjectType({
  name: 'Friend',
  fields: () => ({
    isActive: { type: GraphQLBoolean },
    isRejected: { type: GraphQLBoolean },
    isAccepted: { type: GraphQLBoolean },
    RequestedById: { type: GraphQLInt },
    RequestedToId: { type: GraphQLInt },
  }),
});
const Like = new GraphQLObjectType({
  name: 'Like',
  fields: () => ({
    isActive: { type: GraphQLBoolean },
    likedType: { type: GraphQLString },
    CommentId: { type: GraphQLInt },
    PostId: { type: GraphQLInt },
    LikedById: { type: GraphQLInt },
  }),
});
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: User,
      args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        mobile: { type: GraphQLInt },
        dob: {
          type: GraphQLDate,
        },
      },
      async resolve(parent, args) {
        let user = await services.auth.register(args);
        return user;
      },
    },
    login: {
      type: User,
      args: {
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        mobile: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        let user = await services.auth.login(args);
        return user;
      },
    },
    addPost: {
      type: Post,
      args: {
        text: { type: GraphQLString },
        CreatedById: { type: GraphQLInt },
        postType: { type: GraphQLString },
        OriginalPostId: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        let post = await services.post.createPost(args);
        return post;
      },
    },
    updatePost: {
      type: Post,
      args: {
        text: { type: GraphQLString },
        id: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        let post = await services.post.updatePost(args);
        return post;
      },
    },
    deletePost: {
      type: Post,
      args: {
        id: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        let post = await services.post.deletePost(args);
        return post;
      },
    },
    addFriend: {
      type: Friend,
      args: {
        RequestedById: { type: GraphQLInt },
        RequestedToId: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        let friend = await services.friend.addFriend(args);
        return friend;
      },
    },
    acceptFriend: {
      type: Friend,
      args: {
        RequestedById: { type: GraphQLInt },
        RequestedToId: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        let friend = await services.friend.acceptFriend(args);
        return friend;
      },
    },
    rejectFriend: {
      type: Friend,
      args: {
        RequestedById: { type: GraphQLInt },
        RequestedToId: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        let friend = await services.friend.rejectFriend(args);
        return friend;
      },
    },
    removeFriend: {
      type: Friend,
      args: {
        RequestedById: { type: GraphQLInt },
        RequestedToId: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        let friend = await services.friend.removeFriend(args);
        return friend;
      },
    },
    addLike: {
      type: Like,
      args: {
        likedType: { type: GraphQLString },
        CommentId: { type: GraphQLInt },
        PostId: { type: GraphQLInt },
        LikedById: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        let like = await services.like.addLike(args);
        return like;
      },
    },
    removeLike: {
      type: Like,
      args: {
        CommentId: { type: GraphQLInt },
        PostId: { type: GraphQLInt },
        LikedById: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        let like = await services.like.removeLike(args);
        return like;
      },
    },
  },
});
const query = new GraphQLObjectType({
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
});
const schema = new GraphQLSchema({
  query,
  mutation,
});
router.use(
  '/',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
module.exports = router;
