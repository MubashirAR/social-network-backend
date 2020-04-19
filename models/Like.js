const { DataTypes } = require('sequelize');
const database = require('../config/database').database;

const Like = database.define(
  'like',
  {
    likedType: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['post', 'comment'],
    },
    commentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'comments',
        key: 'id',
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'posts',
        key: 'id',
      },
    },
    likedById: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
  }
);
Like.beforeValidate(({dataValues}) => {
  if (dataValues.likedType === 'comment' && !dataValues.commentId) {
    throw new Error(`commentId missing!`);
  }
if (dataValues.likedType === 'post' && !dataValues.postId) {
    throw new Error(`postId missing!`);
  }
})
module.exports = {
  Like
}