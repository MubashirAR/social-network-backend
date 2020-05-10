const { DataTypes } = require('sequelize');
const database = require('../config/database').database;
const User = require('./User').User;
const Post = require('./Post').Post;
const Comment = require('./Comment').Comment;
const queryInterface = database.getQueryInterface();

const Like = database.define(
  'like',
  {
    likedType: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['post', 'comment'],
    },
    CommentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'comments',
        key: 'id',
      },
    },
    PostId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'posts',
        key: 'id',
      },
    },
    LikedById: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);
// const PostId = Friend.belongsTo(Post, { as: 'PostId' });
// const LikedById = Friend.belongsTo(User, { as: 'LikedById' });
// const CommentId = Friend.belongsTo(Comment, { as: 'CommentId' });

// queryInterface.addConstraint('likes', ['liked_by_id', 'post_id'], {
//   type: 'unique',
// });
// queryInterface.addConstraint('likes', ['liked_by_id', 'comment_id'], {
//   type: 'unique',
// });
Like.beforeValidate(({ dataValues }) => {
  if (dataValues.likedType === 'comment' && !dataValues.CommentId) {
    throw new Error(`commentId missing!`);
  }
  if (dataValues.likedType === 'post' && !dataValues.PostId) {
    throw new Error(`postId missing!`);
  }
});
module.exports = {
  Like,
};
