const comment = require('./index');
const post = require('../post');

describe('Comment', () => {
  let newPost;
  beforeAll(async () => {
    newPost = await post.createPost({
      text: 'This is a test post',
      CreatedById: 1,
      postType: 'post',
    });
  })
  let newComment;
  test('should be created on post', async () => {
    const resp = await comment.createComment({
      text: 'This is a comment on a post',
      CommentById: 1,
      commentedOn: 'post',
      OriginalPostId: newPost.id,
    });
    newComment = resp.id;
    expect(resp.id).toBeTruthy();
  });
  test('should be created on comment', async () => {
    const resp = await comment.createComment({
      text: 'This is a comment on a comment',
      CommentById: 1,
      commentedOn: 'comment',
      OriginalCommentId: newPost.id,
    });
    expect(resp.id).toBeTruthy();
  });
  test('should be updated', async () => {
    const resp = await comment.updateComment({
      id: newComment,
      text: 'This is the updated comment'
    });
    expect(resp.text).toBe('This is the updated comment');
  });
  test('should be deactivated', async () => {
    const resp = await comment.deleteComment({
      id: newComment
    });
    expect(resp.isActive).toBe(false);
  });
});
