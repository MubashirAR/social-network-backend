const moment = require('moment');
const faker = require('faker');
const database = require('../../config/database').database;
const auth = require('./index');
describe('Authentication', () => {
  // const sequelize = new Sequelize('socialnetwork', 'mubashir', 'password', {
  //   host: 'localhost',
  //   dialect: 'postgres',
  // });
  // beforeAll(async () => {
  //   try {
  //     console.log('beforeAll')
  //     await sequelize.authenticate();
  //     console.log('beforeAll authenticated')
  //     // await sequelize.sync({ force: true });
  //     console.log('beforeAll synced')
  //     return true;
      
  //   } catch (error) {
  //     console.log(error)
  //     return error
  //   }
  // });
  afterAll(async () => {
    database.close()
    // return await sequelize.close();
  })
  test('should be registered', async () => {
    let user = await auth.register({
      name: faker.name.findName(),
      email: faker.internet.email(),
      mobile: faker.phone.phoneNumber(),
      dob: moment().subtract(10, 'years'),
    });
    expect(user.id).toBeTruthy();
  });
})
