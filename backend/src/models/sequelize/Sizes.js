const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");
const SizeData = require("../../seedings/Size")
const TABLENAME = "Sizes";

try {
    module.exports = {
        defineModel: async (sequelize) => {
            const Sizes = await sequelize.define(
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
                    }
                },
                {
                    tableName: TABLENAME,
                }
            );
            return Sizes;
            
        },
        insertFixedData: async(sequelize) => { 
            const { Sizes } = sequelize.models

            let type;
            for (let i = 0; i < SizeData.length; i++) {
                type = SizeData[i]
                const { name } = type

                await Sizes.findOrCreate({
                    where: { name}
                })
            }

        }
    }
} catch (error) {
    logger.error(error);
}
