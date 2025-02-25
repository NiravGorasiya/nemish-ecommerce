const { DataTypes } = require("sequelize");
const logger = require("../../config/logger")
const TABLENAME = "Payments";

try {
    module.exports = {
        defineModel: async (sequelize) => {
            const Payments = await sequelize.define(
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
                    paymentDate: {
                        type: DataTypes.DATEONLY,
                        allowNull: false
                    },
                    paymentMethod: {
                        type: DataTypes.ENUM('credit_card', 'paypal', 'bank_transfer', 'cod'),
                        allowNull: false
                    },
                    paymentStatus: {
                        type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
                        allowNull: false,
                        defaultValue: 'pending'
                    },
                    totalAmount: {
                        type: DataTypes.DECIMAL(10, 2)
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
            Payments.references = async (models, sequelize) => {
                try {
                    const queryInterface = sequelize.getQueryInterface();
                    await queryInterface.changeColumn(TABLENAME, "orderId", {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                        references: {
                            model: "Orders",
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

            Payments.associate = (models) => {
                Payments.belongsTo(models.Orders, {
                    foreignKey: "orderId",
                    as: "Orders",
                });
            };
            return Payments;
        }
    }
} catch (error) {
    logger.error(e)
}