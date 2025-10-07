const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");

const TABLENAME = "SubScribe";

try {
    module.exports = {
        defineModel: async (sequelize) => {
            const SubScribe = await sequelize.define(
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
                    }
                },
                {
                    tableName: TABLENAME,
                }
            );
            return SubScribe;
        },
    }
} catch (error) {
    logger.error(error);
}
