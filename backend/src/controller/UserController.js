const bcrypt = require("bcrypt");
const sequelize = require("../models/sequelize/index");
const { DataValidationError, UserNotFoundError, UnauthorizedError } = require("../errors/index");
const { findUserByEmail, findUserById } = require("../queries/users/index");
const { comparePasswords, encryptPassword } = require("../utils/passwordutility");
const { signJWT } = require("../utils/jwtutils");
const jwt = require("jsonwebtoken")
const { findModelItemQ, updateModelItemQ } = require("../queries/generic");
const nodemailer = require("nodemailer");

const userSignupCtrl = async (ctrlData) => {
  try {
    const existingUser = await findUserByEmail(ctrlData.email);

    if (existingUser) {
      throw new DataValidationError("Given Email Already Exists", [
        {
          msg: "Email Already Exists",
          location: "body",
          param: "email",
        },
      ]);
    }

    const hashedPassword = await encryptPassword(ctrlData.password);

    const newUser = await sequelize.models.Users.create({
      userEmail: ctrlData.email,
      userPassword: hashedPassword,
    });

    const token = signJWT({ user: { Id: newUser.Id } });
    newUser.loginJwt = token;
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginController = async ({ email, password }, next) => {
  try {
    let user = await findUserByEmail(email);

    if (user !== null) {

      const result = await comparePasswords(password, user.userPassword);

      if (result === true) {
        const updateUser = await findModelItemQ("Users", {
          where: { Id: user.Id },
        });
        const loginJwt = signJWT({ user: { userId: user.Id } });
        await updateModelItemQ("Users", { loginJwt }, { Id: user.Id });

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

const userProfileController = async (req) => {
  try {
    const user = await findUserById(req.user.Id)
    return user;
  } catch (e) {
    throw e;
  }
};

const userChangePasswordController = async (req) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      throw new DataValidationError("User new password and confirm password not match", [
        {
          msg: "Email Already Exists",
          location: "body",
          param: "email",
        },
      ]);
    }

    const user = await findUserById(req.user.Id)
    const result = await comparePasswords(currentPassword, user.userPassword);

    if (result === true) {

      const hashedPassword = await encryptPassword(newPassword);

      await updateModelItemQ("Users", { userPassword: hashedPassword }, { Id: req.user.Id });

    } else {
      throw new UnauthorizedError();
    }
    return user;
  } catch (e) {
    throw e;
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

const userSendEmailController = async (data) => {

  try {
    const user = await sequelize.models.Users.findOne({ where: { userEmail: data } });

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    const resetToken = signJWT({ id: user.Id }, "15m");

    await sequelize.models.Users.update(
      { resetToken },
      { where: { id: user.Id } }
    );

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.userEmail,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: ${resetUrl}`
    });

  } catch (e) {
    throw e;
  }
};

const userResetPasswordController = async (token, password) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await sequelize.models.Users.findOne({ where: { Id: decoded.id, resetToken: token } });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    const hashedPassword = await encryptPassword(password);

    await sequelize.models.Users.update(
      { userPassword: hashedPassword, resetToken: null },
      { where: { Id: user.Id } }
    )

  } catch (e) {
    throw e;
  }
};

module.exports = {
  userSignupCtrl,
  loginController,
  userProfileController,
  userChangePasswordController,
  userSendEmailController,
  userResetPasswordController
};
