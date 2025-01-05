const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");

const TABLENAME = "Attributes";

try {
    module.exports = {
        defineModel: async (sequelize) => {
            const Attributes = await sequelize.define(
                TABLENAME,
                {
                    Id: {
                        type: DataTypes.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    name: {
                        type: DataTypes.STRING,
                        allowNull: true
                    }

                },
                {
                    tableName: TABLENAME
                }
            )
            return Attributes;
        }
    }
} catch (error) {
    logger.error(e)
}