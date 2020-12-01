// import {SLInitOperations} from '../sqlite/operations/init/SLInitOperations';
//
// const DB_NAME = 'tobuy_shopping_list.db';
// const SQlite = require('react-native-sqlite-storage');
// SQlite.enablePromise(true);
//
// beforeAll(() => {
//   return SLInitOperations.init(SQlite, DB_NAME);
// });

/*
jest.mock('react-native-sqlite-storage', () => ({
  DEBUG: jest.fn,
  enablePromise: jest.fn(),
  openDatabase: (...args) => {
    return {
      transaction: (...args) => Promise.resolve({
        executeSql: (query) => {
          return Promise.resolve([]);
        }
      }),
      cleanDb: ()=> Promise.resolve(),
      executeSql: (query) => {
        return Promise.resolve([]);
      }
    };
  },
}));
 */

test('Shopping list service test test', () => {
  const object = {
    id: 1,
    name: 'My Name',
  };

  expect(object).toHaveProperty('id');
  expect(object).toHaveProperty('name');
});
