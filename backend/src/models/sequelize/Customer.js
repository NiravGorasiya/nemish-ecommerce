const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");

const TABLENAME = "Customer";

try {
    module.exports = {
        defineModel: async (sequelize) => {
            const Customer = await sequelize.define(
                TABLENAME,
                {
                    Id: {
                        type: DataTypes.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    email: {
                        type: DataTypes.STRING,
                        allowNull: false
                    },
                    password: {
                        type: DataTypes.STRING,
                        allowNull: false
                    }
                },
                {
                    tableName: TABLENAME,
                }
            );
            return Customer;
        },
    }
} catch (error) {
    logger.error(error);
}
