const { DataTypes } = require('sequelize');
const database = require('../config/database').database;
const CONSTANTS = require('../constants');

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
      defaultValue: true
    }
  },
  {
    timestamps: true,
    underscored: true
  }
);
// Post.sync({force: true}).then(() => {
//   console.log('sync')
// })
module.exports = { Post };
