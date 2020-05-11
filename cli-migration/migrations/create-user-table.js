module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface
            .createTable("users", {
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
            })
            .then(() => queryInterface.addConstraint("users", ["username"], { type: "unique" })),
    down: (queryInterface) => queryInterface.dropTable("users"),
};
