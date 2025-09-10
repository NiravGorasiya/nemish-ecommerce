const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");

const TABLENAME = "Banners";

try {
  module.exports = {
    defineModel: async (sequelize) => {
      const Banner = await sequelize.define(
        TABLENAME,
        {
          Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          image_url: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          link_url: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          position: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          start_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
          },
          end_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
          },
          status:{
            type:DataTypes.ENUM(
                'active',
                'inactive'
            ),
            default:"active"
          }
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
      return Banner;
    },
  };
} catch (error) {
  logger.error(e);
}
