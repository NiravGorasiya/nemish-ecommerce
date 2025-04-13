const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");

const TABLENAME = "ShippingAddresses";

try {
    module.exports = {
        defineModel: async (sequelize) => {
            const ShippingAddresses = await sequelize.define(
                TABLENAME,
                {
                    Id: {
                        type: DataTypes.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    userId: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                    },
                    address: {
                        type: DataTypes.STRING,
                        allowNull: false,
                    },
                    city: {
                        type: DataTypes.STRING,
                        allowNull: false
                    },
                    postalCode: {
                        type: DataTypes.STRING,
                        allowNull: false
                    },
                    country: {
                        type: DataTypes.STRING,
                        allowNull: false
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
            );

            ShippingAddresses.references = async (models, sequelize) => {
                try {
                    const queryInterface = sequelize.getQueryInterface();
                    await queryInterface.changeColumn(TABLENAME, "userId", {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                        references: {
                            model: "Users",
                            key: "Id",
                        },
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE",
                    });
                } catch (error) {
                    logger.error("Error updating references: ", error);
                    throw error;
                }
            };

            ShippingAddresses.associate = (models) => {
                ShippingAddresses.belongsTo(models.Users, {
                    foreignKey: "userId",
                    as: "Users",
                });
            };

            return ShippingAddresses;
        }
    }
} catch (error) {
    logger.error(error); 
}
