const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");
const ShippingMethodData = require("../../seedings/ShippingMethod");

const TABLENAME = "ShippingMethods";

module.exports = {
    defineModel: async (sequelize) => {
        try {
            const ShippingMethods = await sequelize.define(
                TABLENAME,
                {
                    Id: {
                        type: DataTypes.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    methodName: {
                        type: DataTypes.STRING,
                        allowNull: false,
                    },
                },
                {
                    tableName: TABLENAME,
                    hooks: {
                        beforeCount(options) {
                            options.raw = true;
                        },
                    },
                }
            );
            return ShippingMethods;
        } catch (error) {
            logger.error("Error defining ShippingMethod model:", error);
            throw error;
        }
    },

    insertFixedData: async (sequelize) => {
        try {
            const { ShippingMethods } = sequelize.models;
            for (const { methodName } of ShippingMethodData) {
                await ShippingMethods.findOrCreate({
                    where: { methodName },
                    defaults: { methodName },
                });
            }
        } catch (error) {
            logger.error("Error inserting fixed ShippingMethods data:", error);
            throw error;
        }
    },
};
