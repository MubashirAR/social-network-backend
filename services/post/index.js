const models = require('../../models');
const Sequelize = require('sequelize');

const getAllPost = async ({ CreatedById }) => {
  let posts = await models.Post.Post.findAll({
    raw: false,
    nest: true,
    where: {
      CreatedById,
    },
    order: [['createdAt', 'DESC']],
    include: [models.Post.likes]
  });
  posts = posts.filter(p => p).map(p => {
    p = p.get();
    let likes = p.likes.filter(l => l).map(l => l.get());
    p.likes = likes;
    return p
  })
  return posts;
};
const getPost = ({ id }) => {
  return models.Post.Post.findOne({
    raw: true,
    where: {
      id,
    },
    include: [models.Post.likes]
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
