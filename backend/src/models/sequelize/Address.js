const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");

const TABLENAME = "Address";

try {
    module.exports = {
        defineModel: async (sequelize) => {
            const Address = await sequelize.define(
                TABLENAME,
                {
                    Id: {
                        type: DataTypes.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    userId: {
                        type: DataTypes.INTEGER,
                        allowNull: false
                    },
                    address1: {
                        type: DataTypes.STRING,
                        allowNull: false,
                    },
                    address2: {
                        type: DataTypes.STRING,
                        allowNull: false
                    },
                    city: {
                        type: DataTypes.STRING,
                        allowNull: false
                    },
                    state: {
                        type: DataTypes.STRING,
                        allowNull: false
                    },
                    postalCode: {
                        type: DataTypes.STRING,
                        allowNull: true
                    },
                    country: {
                        type: DataTypes.BOOLEAN,
                        allowNull: false
                    },
                    addressType: {
                        type: DataTypes.ENUM('billing', 'shipping'),
                        allowNull: false,
                        defaultValue: 'shipping'
                    }
                },
                {
                    hooks: {
                        beforeCount(options) {
                            options.raw = true;
                        }
                    }
                },
                {
                    tableName: TABLENAME
                }
            )
            return Address;
        }
    }
} catch (error) {
    logger.error(e)
}