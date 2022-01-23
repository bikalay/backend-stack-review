const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("postgresql://localhost:5432/stack_review");
let initialized = null;

module.exports = async () => {
    if(initialized) {
        return sequelize;
    }
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        console.log("Connection has been established successfully.");
        return sequelize;
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        throw error;
    }
};

