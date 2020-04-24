const { Like } = require('../../models').Like;

const addLike = like => {
  return Like.create(like, {
    raw: true,
  });
};
const removeLike = async ({ CommentId, PostId, LikedById }) => {
  const like = await Like.findOne({
    CommentId,
    PostId,
    LikedById,
  });
  if (!like) {
    return;
  }
  like.isActive = false;
  return await like.save();
};
module.exports = {
  addLike,
  removeLike,
};
