const bcrypt = require("bcrypt");

const encryptPassword = async (plainTextPassword) => {
    try {
        if (typeof plainTextPassword !== "string") {
            throw new Error("Invalid password format: must be a string");
        }
        return await bcrypt.hash(plainTextPassword, 10);
    } catch (error) {
        console.error("Error encrypting password:", error);
        throw error;
    }
};

const comparePasswords = async (plainTextPass, passHash) => {
    try {
        return await bcrypt.compare(plainTextPass, passHash);
    } catch (error) {
        console.error("Error comparing passwords:", error);
        throw error;
    }
};

module.exports = { comparePasswords, encryptPassword };
