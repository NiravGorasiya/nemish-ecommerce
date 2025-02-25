const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");

const TABLENAME = "Reviews";

try {
    module.exports = {
        defineModel: async (sequelize) => {
            const Reviews = await sequelize.define(
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
                    rating: {
                        type: DataTypes.STRING,
                        allowNull: false
                    },
                    text: {
                        type: DataTypes.TEXT,
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
            Reviews.references = async (models, sequelize) => {
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


            Reviews.associate =  (models) => {
                Reviews.belongsTo(models.Products, {
                    foreignKey: "productId",
                    as: "Products",
                });
                Reviews.belongsTo(models.Users, {
                    foreignKey: "userId",
                    as: "Users",
                });
            };
            return Reviews;
        }
    }
} catch (error) {
    logger.error(e)
}