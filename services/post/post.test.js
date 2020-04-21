const post = require('./index');
const database = require('../../config/database').database;

describe('Post', () => {
  let newPostId;
  afterAll(async () => {
    database.close();
    // return await sequelize.close();
  });
  test('list should be returned', async () => {
    const resp = await post.getAllPost({ CreatedById: 1 });
    expect(resp).toBeDefined();
  });
  test('should be returned', async () => {
    const resp = await post.getPost({ id: 3 });
    expect(resp).toBeDefined();
  });
  test('should be created', async () => {
    const resp = await post.createPost({
      text: 'This is a test post',
      CreatedById: 1,
      postType: 'post',
    });
    newPostId = resp.id;
    expect(resp.id).toBeTruthy();
  });
  test('share should be created', async () => {
    const resp = await post.createPost({
      text: 'This is a share',
      CreatedById: 1,
      postType: 'post',
      OriginalPostId: newPostId,
    });
    expect(resp.id).toBeTruthy();
  });
  test('should be updated', async () => {
    const text = `This is the updated info`;
    const resp = await post.updatePost({
      id: newPostId,
      text,
    });
    expect(resp.text).toBe(text);
  });
  test('should be deactivated', async () => {
    const resp = await post.deletePost({
      id: newPostId,
    });
    expect(resp.isActive).toBe(false);
  });
});
