const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");

const TABLENAME = "ProductColour";

try {
    module.exports = {
        defineModel: async (sequelize) => {
            const ProductColor = await sequelize.define(
                TABLENAME,
                {
                    Id: {
                        type: DataTypes.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    productId: {
                        type: DataTypes.INTEGER,
                        allowNull: false
                    },
                    color_id: {
                        type: DataTypes.INTEGER,
                        allowNull: false
                    },
                    images: {
                        type: DataTypes.JSON,
                        allowNull: true
                    }
                },
                {
                    tableName: TABLENAME,
                }
            );
            ProductColor.references = async (models, sequelize) => {
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
                    await queryInterface.changeColumn(TABLENAME, "color_id", {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                        references: {
                            model: "Colours",
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
            ProductColor.associate = (models) => {
                ProductColor.belongsTo(models.Products, {
                    foreignKey: "productId",
                    as: "Products",
                });
                ProductColor.belongsTo(models.Colours, {
                    foreignKey: "color_id",
                    as: "color",
                });
            };
            return ProductColor;
        }
    }
} catch (error) {
    logger.error(error);
}
