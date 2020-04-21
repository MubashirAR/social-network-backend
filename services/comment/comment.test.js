const comment = require('./index');

describe('Comment', () => {
  let newComment;
  test('should be created on post', async () => {
    const resp = await comment.createComment({
      text: 'This is a comment on a post',
      CommentById: 1,
      commentedOn: 'post',
      OriginalPostId: 3,
    });
    newComment = resp.id;
    expect(resp.id).toBeTruthy();
  });
  test('should be created on comment', async () => {
    const resp = await comment.createComment({
      text: 'This is a comment on a comment',
      CommentById: 1,
      commentedOn: 'comment',
      OriginalCommentId: 3,
    });
    expect(resp.id).toBeTruthy();
  });
  test('should be updated', async () => {
    const resp = await comment.updateComment({
      id: newComment,
      text: 'This is the updated comment'
    });
    console.log({resp})
    expect(resp.text).toBe('This is the updated comment');
  });
  test('should be deactivated', async () => {
    const resp = await comment.deleteComment({
      id: newComment
    });
    expect(resp.isActive).toBe(false);
  });
});
