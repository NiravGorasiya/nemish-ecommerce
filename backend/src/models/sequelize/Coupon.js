const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");

const TABLENAME = "Coupons";

try {
  module.exports = {
    defineModel: async (sequelize) => {
      const Coupons = await sequelize.define(
        TABLENAME,
        {
          Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          code: {
            type: DataTypes.STRING,
            allowNull: true
          },
          discountType: {
            type: DataTypes.ENUM("percentage", "fixed"),
            allowNull: true
          },
          discountValue: {
            type: DataTypes.STRING,
            allowNull: true
          },
          expiryDate: {
            type: DataTypes.DATEONLY,
            allowNull: true
          },
          usageLimit: {
            type: DataTypes.INTEGER,
            allowNull: true
          },
          usedCount: {
            type: DataTypes.INTEGER,
            allowNull: true
          },
        },
        {
          tableName: TABLENAME,
        }
      );
      return Coupons;
    },
  };
} catch (error) {
  logger.error(e);
}
