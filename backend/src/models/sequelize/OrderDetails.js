const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");

const TABLENAME = "OrdersDetails";

try {
    module.exports = {
        defineModel: async (sequelize) => {
            const OrdersDetails = await sequelize.define(
                TABLENAME,
                {
                    Id: {
                        type: DataTypes.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    orderId: {
                        type: DataTypes.INTEGER,
                        allowNull: false
                    },
                    productId: {
                        type: DataTypes.INTEGER,
                        allowNull: false
                    },
                    quantity: {
                        type: DataTypes.INTEGER,
                        allowNull: false
                    },
                    price: {
                        type: DataTypes.INTEGER,
                        allowNull: true
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
            return OrdersDetails;
        }
    }
} catch (error) {
    logger.error(e)
}