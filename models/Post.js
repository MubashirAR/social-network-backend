const { DataTypes } = require('sequelize');
const database = require('../config/database').database;
const CONSTANTS = require('../constants');
const Like = require('./Like').Like;

const Post = database.define(
  'post',
  {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: { args: 3, msg: 'The post is too short. Please ensure you have completed your post before submitting.' },
        max: { args: 500, msg: 'The post is too long. Maximum size of the post can be 500 characters' },
      },
    },
    CreatedById: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    postType: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: CONSTANTS.POST_TYPES,
      validate: {
        missingIdCheck(value) {
          if (value === 'share' && !this.OriginalPostId) {
            throw new Error('OriginalPostId missing!');
          }
        },
      },
    },
    OriginalPostId: {
      // In case the post is actually a shared post
      type: DataTypes.INTEGER,
      references: {
        model: 'posts',
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
const likes = Post.hasMany(Like, {
  as: 'likes'
});
// Post.sync({force: true}).then(() => {
//   console.log('sync')
// })
module.exports = { Post, likes };
