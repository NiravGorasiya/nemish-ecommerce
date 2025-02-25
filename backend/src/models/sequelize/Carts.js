const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");

const TABLENAME = "Carts";

try {
    module.exports = {
        defineModel: async (sequelize) => {
            const Carts = await sequelize.define(
                TABLENAME,
                {
                    Id: {
                        type: DataTypes.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    productId: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                    },
                    userId: {
                        type: DataTypes.INTEGER,
                        allowNull: false
                    },
                    quantity: {
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
            )
            Carts.references = async (models, sequelize) => {
                try {
                    const queryInterface = sequelize.getQueryInterface();
                    await queryInterface.changeColumn(TABLENAME, "productId", {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                        references: {
                            model: "Products",
                            key: "Id",
                        },
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE",
                    });
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


            Carts.associate =  (models) => {
                Carts.belongsTo(models.Products, {
                    foreignKey: "productId",
                    as: "Products",
                });
                Carts.belongsTo(models.Users, {
                    foreignKey: "userId",
                    as: "Users",
                });
            };
            return Carts;
        }
    }
} catch (error) {
    logger.error(e)
}