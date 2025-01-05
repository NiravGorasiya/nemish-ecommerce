const { DataTypes } = require("sequelize");
const logger = require("../../config/logger");
const TABLENAME = "Users";

try {
  module.exports = {
    defineModel: async (sequelize) => {
      const Users = await sequelize.define(
        TABLENAME,
        {
          Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          username: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: true,
          }
        },
        {
          tableName: TABLENAME,
        }
      );
      return Users;
    }
  };
} catch (e) {
  logger.error(e);
}
