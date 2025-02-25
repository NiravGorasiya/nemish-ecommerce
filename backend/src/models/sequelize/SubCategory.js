const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");
const subCategoryData = require("../../seedings/SubCategory")

const TABLENAME = "SubCategories";

module.exports = {
    defineModel: (sequelize) => {
        const SubCategories = sequelize.define(
            TABLENAME,
            {
                Id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                categoryId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                tableName: TABLENAME,
            }
        );

        SubCategories.references = async (models, sequelize) => {
            try {
                const queryInterface = sequelize.getQueryInterface();
                await queryInterface.changeColumn(TABLENAME, "categoryId", {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "Categories",
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


        SubCategories.associate = (models) => {
            SubCategories.belongsTo(models.Categories, {
                foreignKey: "categoryId",
                as: "Categories",
            });
        };
        return SubCategories;

    },
    insertFixedData: async (sequelize) => {
        const { SubCategories } = sequelize.models

        let type;
        for (let i = 0; i < subCategoryData.length; i++) {
            type = subCategoryData[i]
            const { name, categoryId } = type

            await SubCategories.findOrCreate({
                where: { categoryId, name }
            })
        }

    }
};
