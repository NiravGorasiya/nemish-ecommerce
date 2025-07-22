const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");
const categoryData = require("../../seedings/Category")

const TABLENAME = "Categories";

try {
    module.exports = {
        defineModel: async (sequelize) => {
            const Categorys = await sequelize.define(
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
                    tableName: TABLENAME
                }
            )
            Categorys.associate = (models) => {
                Categorys.hasMany(models.SubCategories, {
                    foreignKey: "categoryId",
                    as: "SubCategories",
                });
            };
            return Categorys;
        },
        insertFixedData: async (sequelize) => {
            const { Categories } = sequelize.models

            let type;
            for (let i = 0; i < categoryData.length; i++) {
                type = categoryData[i]
                const { name } = type

                await Categories.findOrCreate({
                    where: { name }
                })
            }

        }
    }
} catch (error) {
    logger.error(e)
}