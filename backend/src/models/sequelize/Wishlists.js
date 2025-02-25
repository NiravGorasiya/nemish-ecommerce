const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");

const TABLENAME = "Wishlists";

try {
    module.exports = {
        defineModel: async (sequelize) => {
            const Wishlists = await sequelize.define(
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
            Wishlists.references = async (models, sequelize) => {
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


            Wishlists.associate =  (models) => {
                Wishlists.belongsTo(models.Products, {
                    foreignKey: "productId",
                    as: "Products",
                });
                Wishlists.belongsTo(models.Users, {
                    foreignKey: "userId",
                    as: "Users",
                });
            };
            return Wishlists;
        }
    }
} catch (error) {
    logger.error(e)
}