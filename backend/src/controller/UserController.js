const bcrypt = require("bcrypt");
const sequelize = require("../models/sequelize/index");
const { DataValidationError, UserNotFoundError } = require("../errors/index");
const { findUserByEmail } = require("../queries/users/index");
const { comparePasswords } = require("../utils/passwordutility");
const { signJWT } = require("../utils/jwtutils");

const userSignupCtrl = async (ctrlData) => {
  try {
    const hashed = await bcrypt.hash(ctrlData.password, 8);
    const user = await findUserByEmail(ctrlData.email);
    if (user) {
      throw new DataValidationError("Given Email Already Exists", [
        {
          msg: "Email Already Exists",
          location: "body",
          param: "email",
        },
      ]);
    } else {
      const register = await sequelize.models.Users.create({
        username: ctrlData.username,
        email: ctrlData.email,
        password: hashed,
      });
      const result = await register.save();
      return result;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const userloginctrl = async ({ email, password }, next) => {
  try {
    const user = await findUserByEmail(email);
    if (user !== null) {
      if (user.provider == "NORMAL") {
        const result = await comparePasswords(password, user.password);
        if (result === true) {
          const loginjwt = signJWT({ user: { Id: user.Id } });
          return { token: loginjwt };
        } else {
          throw new DataValidationError("password not match");
        }
      } else {
        throw new Error(`you might have logged using ${user.provider} last time!`);
      }
    } else {
      throw new UserNotFoundError();
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  userSignupCtrl,
  userloginctrl
};
