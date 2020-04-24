const models = require('../../models');
const Sequelize = require('sequelize');

const getAllPost = ({ CreatedById }) => {
  return models.Post.Post.findAll({
    where: {
      CreatedById,
    },
  });
};
const getPost = ({ id }) => {
  return models.Post.Post.findOne({
    raw: true,
    where: {
      id,
    },
  });
};
const createPost = (post) => {
  return models.Post.Post.create(post);
};
const updatePost = async ({ id, text }) => {
  if (!id || !text) {
    throw new Error(`Missing details.`);
  }
  let user = await models.Post.Post.findOne({
    where: {
      id,
    },
  });
  user.text = text;
  // user.isActive = user.isActive || isActive;
  return await user.save();
};
const deletePost = async ({ id }) => {
  if (!id) {
    throw new Error(`Missing details.`);
  }
  let user = await models.Post.Post.findOne({
    where: {
      id,
    },
  });
  user.isActive = false;
  return await user.save();
};
module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPost,
  getPost,
};
