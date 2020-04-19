const database = require('../config/database').database;
const { DataTypes } = require('sequelize');

const Comment = database.define(
  'comment',
  {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: { args: 500, msg: `Comment is too long, max 500 characters allowed` },
      },
    },
    _commentBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    commentedOn: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['post', 'comment'],
    },
    _originalCommentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'comments',
        key: 'id',
      },
    },
    _originalPostId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'posts',
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
  }
);
Comment.beforeValidate(({ dataValues }) => {
  if (dataValues.commentedOn === 'comment' && !dataValues._originalCommentId) {
    throw new Error(`Original _originalCommentId missing`);
  }
  if (dataValues.commentedOn === 'post' && !dataValues._originalPostId) {
    throw new Error(`Original _originalPostId missing`);
  }
});
module.exports = { Comment };
