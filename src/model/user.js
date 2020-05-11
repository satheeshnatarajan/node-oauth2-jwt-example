const Sequelize = require("sequelize");

class User extends Sequelize.Model {}
User.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
        },
        userName: {
            allowNull: false,
            unique: true,
            type: Sequelize.STRING,
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        firstName: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        lastName: {
            allowNull: false,
            type: Sequelize.STRING,
        },
    },
    { sequelize }
);

module.exports = User;
