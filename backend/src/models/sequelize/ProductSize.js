const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");

const TABLENAME = "ProductSizes";

try {
    module.exports = {
        defineModel: async (sequelize) => {
            const ProductSizes = await sequelize.define(
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
                    size_id: {
                        type: DataTypes.INTEGER,
                        allowNull: false
                    },
                },
                {
                    tableName: TABLENAME,
                }
            );
            ProductSizes.references = async (models, sequelize) => {
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
                    await queryInterface.changeColumn(TABLENAME, "size_id", {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                        references: {
                            model: "Sizes",
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
            ProductSizes.associate = (models) => {
                ProductSizes.belongsTo(models.Products, {
                    foreignKey: "productId",
                    as: "Products",
                });
                ProductSizes.belongsTo(models.Sizes, {
                    foreignKey: "size_id",
                    as: "size",
                });

            };
            return ProductSizes;
        }

    }
} catch (error) {
    logger.error(error);
}
