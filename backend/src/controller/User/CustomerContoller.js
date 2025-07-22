const sequelize = require("../../models/sequelize/");
const { findCustomerByEmail } = require("../../queries/customer/customer");
const { findModelItemQ } = require("../../queries/generic");
const { findUserByEmail } = require("../../queries/users");
const { signJWT } = require("../../utils/jwtutils");
const { encryptPassword, comparePasswords } = require("../../utils/passwordutility");

const customerSignupCtrl = async (ctrlData) => {
  try {
    const existingUser = await findCustomerByEmail(ctrlData.email);
    if (!existingUser) {
      const hashedPassword = await encryptPassword(ctrlData.password);
      const newUser = await sequelize.models.Customer.create({
        email: ctrlData.email,
        password: hashedPassword,
      });
      const token = signJWT({ user: { Id: newUser.Id } });
      newUser.loginJwt = token;
      await newUser.save();
      return newUser;
    } else {
      const result = await comparePasswords(ctrlData.password, existingUser.password);
      const updateUser = await findModelItemQ("Customer", {
        where: { Id: existingUser.Id },
      });
      const loginJwt = signJWT({ user: { userId: updateUser.Id } });
      return { token: loginJwt, user: updateUser };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  customerSignupCtrl
};
