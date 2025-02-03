const { DataTypes, where } = require("sequelize");
const logger = require("../../config/logger");
const userData = require("../../seedings/User");
const { insertFixedData } = require("./Sizes");
const { encryptPassword } = require("../../utils/passwordutility");
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
          userEmail: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
              isEmail: true
            }
          },
          userPassword: {
            type: DataTypes.TEXT,
            set(value) {
              const hashed = encryptPassword(value)
              this.setDataValue('userPassword', hashed);
            },
            get() {
              return this.getDataValue('userPassword');
            }
          }
        },
        {
          tableName: TABLENAME,
        }
      );
      return Users;
    },
    insertFixedData: async (sequelize) => {
      const { Users } = sequelize.models;
      let user;
      for (let i = 0; i < userData.length; i++) {
        user = userData[i];
        const { userEmail, userPassword, username } = user;
        await Users.findOrCreate({
          where: { userEmail, userPassword, username }
        })
      }
    }
  };
} catch (e) {
  logger.error(e);
}
