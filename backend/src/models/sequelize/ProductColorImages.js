const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");

const TABLENAME = "ProductColorImages";

module.exports = {
    defineModel: async (sequelize) => {
        const ProductColorImages = sequelize.define(
            TABLENAME,
            {
                Id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                productColourId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                imageUrl: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            {
                tableName: TABLENAME
            }
        );

        ProductColorImages.associate = (models) => {
            ProductColorImages.belongsTo(models.ProductColours, { 
                foreignKey: "productColourId",
                as: "productColour",
            });
        };

        return ProductColorImages;
    }
};
