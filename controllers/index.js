const router = require('express').Router();
const Sequelize = require('sequelize');
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
    id: { type: GraphQLInt },
    name: {
      type: GraphQLString,
    },
    email: { type: GraphQLString },
    mobile: { type: GraphQLString },
    dob: { type: GraphQLString },
    FriendRequestsSent: { type: new GraphQLList(Friend) },
    FriendRequestsReceived: { type: new GraphQLList(Friend) },
    createdAt: { type: GraphQLString },
  }),
});
const Post = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLInt },
    text: { type: GraphQLString },
    CreatedById: { type: GraphQLInt },
    postType: { type: GraphQLString },
    OriginalPostId: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
    likes: { type: new GraphQLList(Like) },
    CreatedBy: { type: User },
    comments: { type: new GraphQLList(Comment) },
  }),
});
const Friend = new GraphQLObjectType({
  name: 'Friend',
  fields: () => ({
    id: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
    isRejected: { type: GraphQLBoolean },
    isAccepted: { type: GraphQLBoolean },
    RequestedById: { type: GraphQLInt },
    RequestedToId: { type: GraphQLInt },
    RequestedBy: { type: User },
    RequestedTo: { type: User },
  }),
});
const Like = new GraphQLObjectType({
  name: 'Like',
  fields: () => ({
    id: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
    likedType: { type: GraphQLString },
    CommentId: { type: GraphQLInt },
    PostId: { type: GraphQLInt },
    LikedById: { type: GraphQLInt },
  }),
});
const Comment = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
    text: { type: GraphQLString },
    CommentById: { type: GraphQLInt },
    OriginalCommentId: { type: GraphQLInt },
    CommentedOn: { type: GraphQLString },
    CommentBy: { type: User },
    comments: { type: new GraphQLList(Comment) },
    likes: { type: new GraphQLList(Like) },
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
        // CreatedById: { type: GraphQLInt },
        postType: { type: GraphQLString },
        OriginalPostId: { type: GraphQLInt },
      },
      async resolve(parent, args, request) {
        args.CreatedById = request.user.id;
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
    addComment: {
      type: Comment,
      args: {
        text: { type: GraphQLString },
        CommentById: { type: GraphQLInt },
        OriginalCommentId: { type: GraphQLInt },
        OriginalPostId: { type: GraphQLInt },
        commentedOn: { type: GraphQLString },
      },
      async resolve(parent, args) {
        let like = await services.comment.createComment(args);
        return like;
      },
    },
    removeComment: {
      type: Comment,
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
    user: {
      type: User,
      args: {
        email: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        return user.login(args);
      },
    },
    users: {
      type: new GraphQLList(User),
      args: {
        text: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        return services.user.getAllUsers({ text: args.text }).then((data) => {
          return data;
        });
      },
    },
    posts: {
      type: new GraphQLList(Post),
      resolve: () => {
        return Models.Post.Post.findAll().then((data) => {
          return data;
        });
      },
    },
    friends: {
      type: new GraphQLList(Friend),
      resolve: () => {
        return Models.Friend.Friend.findAll({
          include: [Models.Friend.RequestedTo, Models.Friend.RequestedBy],
        }).then((data) => {
          return data;
        });
      },
    },
    feed: {
      type: new GraphQLList(Post),
      resolve: async (parent, args, request) => {
        const resp = await services.post.getFeed({ CreatedById: request.user.id });
        return resp;
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
