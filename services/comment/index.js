const {Comment, OriginalCommentId, OriginalPostId} = require('../../models').Comment;

const createComment = comment => {
  return Comment.create(comment, {
    include: [OriginalCommentId, OriginalPostId]
  });
};
const updateComment = async ({id, text}) => {
  if(!id || !text){
    throw new Error(`Missing details!`)
  }
  const comment = await Comment.findOne({
    where: {
      id,
    },
  });
  comment.text = text
  return await comment.save();
};
const deleteComment = async ({id}) => {
  if(!id){
    throw new Error(`Missing details!`)
  }
  const comment = await Comment.findOne({
    where: {
      id,
    },
  });
  comment.isActive = false;
  return await comment.save();
};
module.exports = {
  createComment,
  updateComment,
  deleteComment
}