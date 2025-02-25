const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");

const TABLENAME = "ProductColours";

module.exports = {
    defineModel: async (sequelize) => {
        const ProductColours = sequelize.define(
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
                colorId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            {
                tableName: TABLENAME,
            }
        );

        ProductColours.associate = (models) => {
            ProductColours.belongsTo(models.Products, {
                foreignKey: "productId",
                as: "product",
            });
            ProductColours.belongsTo(models.Colours, {
                foreignKey: "colorId",
                as: "colour",
            });
            ProductColours.hasMany(models.ProductColorImages, {
                foreignKey: "productColourId",
                as: "images",
                onDelete: "CASCADE",
            });
        };

        return ProductColours;
    }
};
