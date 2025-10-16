const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");

const TABLENAME = "ProductCompares";

module.exports = {
  defineModel: async (sequelize) => {
    const ProductCompares = sequelize.define(
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
          allowNull: false,
        },
      },
      {
        tableName: TABLENAME,
      }
    );
    ProductCompares.references = async (models, sequelize) => {
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
    ProductCompares.associate = (models) => {
      ProductCompares.belongsTo(models.Products, {
        foreignKey: "productId",
        as: "Products",
      });
      Orders.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "Users",
      });
    };

    return ProductCompares;
  },
};
