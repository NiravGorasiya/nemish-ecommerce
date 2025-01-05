const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");
const colorData = require("../../seedings/Colour")

const TABLENAME = "Colours";

try {
    module.exports = {
        defineModel: async (sequelize) => {
            const Colours = await sequelize.define(
                TABLENAME,
                {
                    Id: {
                        type: DataTypes.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    name: {
                        type: DataTypes.STRING,
                        allowNull: true
                    },
                    hex_code: {
                        type: DataTypes.CHAR(7),
                        allowNull: false,
                        validate: {
                            is: /^#[0-9A-Fa-f]{6}$/
                        }
                    }
                },
                {
                    tableName: TABLENAME,
                }
            );
            return Colours;
        },
        insertFixedData: async (sequelize) => {
            const { Colours } = sequelize.models

            let type;
            for (let i = 0; i < colorData.length; i++) {
                type = colorData[i]
                const { name ,hex_code} = type

                await Colours.findOrCreate({
                    where: { name,hex_code }
                })
            }

        }
    }
} catch (error) {
    logger.error(error);
}
