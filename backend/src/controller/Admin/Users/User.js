const { findModelItemQ } = require("../../../queries/generic");
const { findUserByEmail } = require("../../../queries/users/users");
const { signJWT } = require("../../../utils/jwtutils");
const { comparePasswords } = require("../../../utils/passwordutility");
const { UserNotFoundError} = require("../../../errors")

const loginController = async ({ email, password }, next) => {
    try {
        let user = await findUserByEmail(email);
        
        if (user !== null) {
            const result = await comparePasswords(password, user.userPassword);

            if (result === true) {
                const loginJwt = signJWT({ user: { userId: user.userId } });
                const updateUser = await findModelItemQ("Users", {
                    where: { Id: user.Id },
                });

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

module.exports = { loginController }