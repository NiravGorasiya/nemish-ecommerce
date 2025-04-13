const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");

const TABLENAME = "Products";

try {
    module.exports = {
        defineModel: async (sequelize) => {
            const Products = await sequelize.define(
                TABLENAME,
                {
                    Id: {
                        type: DataTypes.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    categoryId: {
                        type: DataTypes.INTEGER,
                        allowNull: true
                    },
                    subcategoryId: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                    },
                    name: {
                        type: DataTypes.STRING,
                        allowNull: false
                    },
                    title: {
                        type: DataTypes.STRING,
                        allowNull: false
                    },
                    description: {
                        type: DataTypes.STRING,
                        allowNull: false
                    },
                    isActive: {
                        type: DataTypes.BOOLEAN,
                        allowNull: true
                    },
                    stockQuantity: {
                        type: DataTypes.INTEGER,
                        allowNull: true
                    },
                    SKU: {
                        type: DataTypes.INTEGER,
                        allowNull: false
                    },
                    price: {
                        type: DataTypes.FLOAT,
                        allowNull: false
                    },
                    finalPrice: {
                        type: DataTypes.FLOAT,
                        allowNull: false
                    },
                    status: {
                        type: DataTypes.ENUM('active', 'inactive'),
                        allowNull: false,
                        defaultValue: 'active'
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
            Products.references = async (models, sequelize) => {
                try {
                    const queryInterface = sequelize.getQueryInterface();
                    await queryInterface.changeColumn(TABLENAME, "subcategoryId", {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                        references: {
                            model: "SubCategories",
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


            Products.associate = (models) => {
                Products.belongsTo(models.SubCategories, {
                    foreignKey: "subcategoryId",
                    as: "SubCategories",
                });
                Products.hasMany(models.ProductSizes, {
                    foreignKey: 'productId',
                    as: "sizes",
                }),
                    Products.hasMany(models.ProductColours, {
                        foreignKey: 'productId',
                        as: "colours",
                    })
            };
            return Products;
        }
    }
} catch (error) {
    logger.error(e)
}