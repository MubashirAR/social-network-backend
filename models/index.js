const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Friend = require('../models/Friend');
const Block = require('../models/Block');
const Picture = require('../models/Picture');
const Like = require('../models/Like');

// const friends = User.User.hasMany(Friend.Friend, {
//   as: 'friends',
//   foreignKey: 'requested_by_id',

// })

const friends = User.User.belongsToMany(User.User, {
  as: 'FriendRequested',
  foreignKey: 'requested_to_id',
  through: Friend.Friend,
  otherKey: 'requested_by_id',
});
const friends2 = User.User.belongsToMany(User.User, {
  as: 'FriendsReceived',
  foreignKey: 'requested_by_id',
  through: Friend.Friend,
  otherKey: 'requested_to_id',
});
User.User.hasMany(Friend.Friend, {
  as: 'FriendRequestsSent',
  foreignKey: 'requested_by_id',
});
User.User.hasMany(Friend.Friend, {
  as: 'FriendRequestsReceived',
  foreignKey: 'requested_to_id',
});
User.User.hasMany(Post.Post, {
  as: 'PostsCreated',
  foreignKey: 'created_by_id',
});
Post.Post.hasOne(User.User, {
  as: 'CreatedBy',
  foreignKey: 'id',
  sourceKey: 'created_by_id'
});
module.exports = {
  User,
  Post,
  Comment,
  Friend,
  Block,
  Picture,
  Like,
  associations: {
    User: {
      friends,
      friends2,
    },
  },
};
