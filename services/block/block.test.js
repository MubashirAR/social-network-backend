const faker = require('faker');
const moment = require('moment');
const block = require('./index');
const user = require('../auth');

describe('Block', () => {
  let user1, user2, newBlock;
  beforeAll(async () => {
    user1 = await user.register({
      name: faker.name.findName(),
      email: faker.internet.email(),
      mobile: faker.phone.phoneNumber(),
      dob: moment().subtract(10, 'years'),
    });
    user2 = await user.register({
      name: faker.name.findName(),
      email: faker.internet.email(),
      mobile: faker.phone.phoneNumber(),
      dob: moment().subtract(10, 'years'),
    });
  });
  test('should be created', async () => {
    console.log(user1, user2)
    newBlock = await block.blockUser({
      BlockedById: user1.id,
      BlockedUserId: user2.id,
    });
    expect(newBlock.id).toBeTruthy();
  });
  test('should be disabled', async () => {
    newBlock = await block.unblockUser(newBlock.id);
    expect(newBlock.isActive).toBe(false);
  });
});
