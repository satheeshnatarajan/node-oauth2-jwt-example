// eslint-disable-next-line import/no-extraneous-dependencies
const uuidv4 = require("uuid/v4");

module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.bulkInsert("users", [
            {
                id: uuidv4(),
                firstName: "admin",
                lastName: "admin",
                userName: "admin",
                password: "admin",
            },
        ]),

    down: (queryInterface, Sequelize) => {
        /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    },
};
