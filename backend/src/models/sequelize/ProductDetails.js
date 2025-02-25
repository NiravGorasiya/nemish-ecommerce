const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");

const TABLENAME = "Product_details";

try {
    module.exports = {
        defineModel: async (sequelize) => {
            const ProductDetails = await sequelize.define(
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
                    colorId: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                    },
                    images: {
                        type: DataTypes.JSON, 
                        allowNull: false,
                        defaultValue: [],
                    }
                },
                {
                    tableName: TABLENAME
                }
            )
            ProductDetails.references = async (models, sequelize) => {
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
                    await queryInterface.changeColumn(TABLENAME, "colorId", {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                        references: {
                            model: "colours",
                            key: "Id",
                        },
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE",
                    })
                } catch (error) {
                    logger.error("Error updating references: ", error);
                    throw error;
                }
            };


            ProductDetails.associate = (models) => {
                ProductDetails.belongsTo(models.Products, {
                    foreignKey: "productId",
                    as: "Products",
                });
                ProductDetails.belongsTo(models.Colours, {
                    foreignKey: "colorId",
                    as: "Colours",
                });
            };
            return ProductDetails;
        }
    }
} catch (error) {
    logger.error(e)
}