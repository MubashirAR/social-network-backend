const database = require('../config/database').database;
const { DataTypes } = require('sequelize');
const { User } = require('./User');

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
    CommentById: {
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
    // OriginalCommentId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: 'comments',
    //     key: 'id',
    //   },
    // },
    // OriginalPostId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: 'posts',
    //     key: 'id',
    //   },
    // },
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
const OriginalCommentId = Comment.belongsTo(User, {
  as: 'OriginalComment',
  foreignKey: {
    allowNull: true,
  },
});
const OriginalPostId = Comment.belongsTo(User, {
  as: 'OriginalPost',
  foreignKey: {
    allowNull: true,
  },
});
Comment.beforeValidate(({ dataValues }) => {
  if (dataValues.commentedOn === 'comment' && !dataValues.OriginalCommentId) {
    throw new Error(`OriginalCommentId missing`);
  }
  if (dataValues.commentedOn === 'post' && !dataValues.OriginalPostId) {
    throw new Error(`OriginalPostId missing`);
  }
});
module.exports = { Comment, OriginalCommentId, OriginalPostId };
