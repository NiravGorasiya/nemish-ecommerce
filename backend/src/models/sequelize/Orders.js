const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");

const TABLENAME = "Orders";

try {
  module.exports = {
    defineModel: async (sequelize) => {
      const Orders = await sequelize.define(
        TABLENAME,
        {
          Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          orderNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          orderDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
          },
          tracking_number: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          payment_status:{
            type:DataTypes.ENUM(
                "pending",
                "completed",
                "failed",
                "refunded"
            )
          },
          ShippingMethodId: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          ShippingAddressId: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          status: {
            type: DataTypes.ENUM(
              "pending",
              "processing",
              "shipped",
              "delivered",
              "cancelled",
              "returned",
              "refunded",
              "on_hold",
              "completed",
              "failed",
              "draft",
              "order_received",
              "order_confirm"
            ),
            allowNull: false,
            defaultValue: "pending",
          },
          totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
          },
        },
        {
          hooks: {
            beforeCount(options) {
              options.raw = true;
            },
          },
        },
        {
          tableName: TABLENAME,
        }
      );
      Orders.references = async (models, sequelize) => {
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

      Orders.associate = (models) => {
        Orders.belongsTo(models.Users, {
          foreignKey: "userId",
          as: "Users",
        });
        Orders.hasMany(models.OrdersDetails, {
          foreignKey: "orderId",
          as: "orderDetails",
        });
      };
      return Orders;
    },
  };
} catch (error) {
  logger.error(e);
}
