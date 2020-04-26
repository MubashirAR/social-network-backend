const { Like } = require('../../models').Like;

const addLike = like => {
  return Like.create(like, {
    raw: true,
  });
};
const removeLike = async ({ CommentId, PostId, LikedById }) => {
  if (!CommentId && !PostId) {
    throw { msg: 'Post or Comment Id required' };
  }
  const where = {
    LikedById,
  };
  if (CommentId) {
    where['CommentId'] = CommentId;
  }
  if (PostId) {
    where['PostId'] = PostId;
  }
  const like = await Like.findOne({
    where
  });
  if (!like) {
    throw { msg: 'You have not liked this item.' };
  }
  like.isActive = false;
  return await like.save();
};
module.exports = {
  addLike,
  removeLike,
};
