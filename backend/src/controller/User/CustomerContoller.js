const sequelize = require("../../models/sequelize/");
const { findCustomerByEmail } = require("../../queries/customer/customer");
const { findModelItemQ, updateModelItemQ } = require("../../queries/generic");
const { findUserByEmail } = require("../../queries/users");
const { signJWT } = require("../../utils/jwtutils");
const {
  encryptPassword,
  comparePasswords,
} = require("../../utils/passwordutility");

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
      const result = await comparePasswords(
        ctrlData.password,
        existingUser.password
      );
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

const loginController = async ({ email, password }, next) => {
  try {
    console.log(email, password, "email password");

    let user = await findUserByEmail(email);

    if (user !== null) {
      const result = await comparePasswords(password, user.userPassword);

      if (result === true) {
        const updateUser = await findModelItemQ("Customer", {
          where: { Id: user.Id },
        });
        const loginJwt = signJWT({ user: { userId: user.Id } });
        await updateModelItemQ("Customer", { loginJwt }, { Id: user.Id });

        return { token: loginJwt, user: updateUser };
      } else {
        throw new UnauthorizedError();
      }
    } else {
      throw new UserNotFoundError();
    }
  } catch (e) {
    throw e;
  }
};

module.exports = {
  customerSignupCtrl,
  loginController,
};
