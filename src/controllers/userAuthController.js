'use strict';
const { auth } = require("../config/firebase");

//get user from firebase
const getUserAuth = async (userId) => {
    try {
        const userRecord = await auth.getUser(userId);
        return userRecord;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

//get user by email from firebase
const getUserAuthByEmail = async (email) => {
    try {
        const userRecord = await auth.getUserByEmail(email);
        return userRecord;
    } catch (error) {
        console.error("Error fetching user by email:", error);
        throw error;
    }
};

//create user in firebase
const createUserAuth = async (user) => {
  let userRecord
    try {
          userRecord = await auth.createUser({
            email: user.email,
            emailVerified: false,
            password: user.password,
            displayName: user.displayName,
            disabled: false
        })

        console.log('Successfully created new user:', userRecord.uid);
        return userRecord;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

//delete user in firebase
const deleteUserAuth = async (userId) => {
    try {
        await auth.deleteUser(userId);
        return { message: `User ${userId} deleted` };
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

//update user in firebase
const updateUserAuth = async (userId, user) => {
    try {
        const userRecord = await auth.updateUser(userId, {
            email: user.email,
            password: user.password,
            displayName: user.displayName,
            disabled: false
        });
        return userRecord;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

const resetPassword = async (email) => {
    try {
        const userRecord = await auth.getUserByEmail(email);
        const resetLink = await auth.generatePasswordResetLink(email);
        // Here you would send the reset link to the user's email
        return { message: `Password reset link sent to ${email}`, resetLink };
    } catch (error) {
        console.error("Error resetting password:", error);
        throw error;
    }
};


//update user password in firebase
const updateUserAuthPassword = async (userId, password) => {
    try {
        const userRecord = await auth.updateUser(userId, {
            password: password
        });
        return userRecord;
    } catch (error) {
        console.error("Error updating user password:", error);
        throw error;
    }
};

//update user email in firebase
const updateUserAuthEmail = async (userId, email) => {
    try {
        const userRecord = await auth.updateUser(userId, {
            email: email
        });
        return userRecord;
    } catch (error) {
        console.error("Error updating user email:", error);
        throw error;
    }
};

//update user display name in firebase
const updateUserAuthDisplayName = async (userId, displayName) => {
    try {
        const userRecord = await auth.updateUser(userId, {
            displayName: displayName
        });
        return userRecord;
    } catch (error) {
        console.error("Error updating user display name:", error);
        throw error;
    }
};

//update user disabled in firebase
const updateUserAuthDisabled = async (userId, disabled) => {
    try {
        const userRecord = await auth.updateUser(userId, {
            disabled: disabled
        });
        return userRecord;
    } catch (error) {
        console.error("Error updating user disabled:", error);
        throw error;
    }
};

//update user custom claims in firebase
const updateUserAuthCustomClaims = async (userId, claims) => {
    try {
        const userRecord = await auth.setCustomUserClaims(userId, claims);
        return userRecord;
    } catch (error) {
        console.error("Error updating user custom claims:", error);
        throw error;
    }
};

//update user tokens in firebase
const updateUserAuthTokens = async (userId, tokens) => {
    try {
        const userRecord = await auth.setCustomUserClaims(userId, { tokens });
        return userRecord;
    } catch (error) {
        console.error("Error updating user tokens:", error);
        throw error;
    }
};

//update user tokens valid in firebase
const updateUserAuthTokensValid = async (userId, tokensValid) => {
    try {
        const userRecord = await auth.setCustomUserClaims(userId, { tokensValid });
        return userRecord;
    } catch (error) {
        console.error("Error updating user tokens valid:", error);
        throw error;
    }
};

//update user tokens invalid in firebase
const updateUserAuthTokensInvalid = async (userId, tokensInvalid) => {
    try {
        const userRecord = await auth.setCustomUserClaims(userId, { tokensInvalid });
        return userRecord;
    } catch (error) {
        console.error("Error updating user tokens invalid:", error);
        throw error;
    }
};

//update user tokens expired in firebase
const updateUserAuthTokensExpired = async (userId, tokensExpired) => {
    try {
        const userRecord = await auth.setCustomUserClaims(userId, { tokensExpired });
        return userRecord;
    } catch (error) {
        console.error("Error updating user tokens expired:", error);
        throw error;
    }
};

//update user tokens revoked in firebase
const updateUserAuthTokensRevoked = async (userId, tokensRevoked) => {
    try {
        const userRecord = await auth.setCustomUserClaims(userId, { tokensRevoked });
        return userRecord;
    } catch (error) {
        console.error("Error updating user tokens revoked:", error);
        throw error;
    }
};

//update user tokens blacklisted in firebase
const updateUserAuthTokensBlacklisted = async (userId, tokensBlacklisted) => {
    try {
        const userRecord = await auth.setCustomUserClaims(userId, { tokensBlacklisted });
        return userRecord;
    } catch (error) {
        console.error("Error updating user tokens blacklisted:", error);
        throw error;
    }
};

//update user tokens whitelisted in firebase
const updateUserAuthTokensWhitelisted = async (userId, tokensWhitelisted) => {
    try {
        const userRecord = await auth.setCustomUserClaims(userId, { tokensWhitelisted });
        return userRecord;
    } catch (error) {
        console.error("Error updating user tokens whitelisted:", error);
        throw error;
    }
};

//listar todos los usuarios de firebase
const listAllUsers = async (nextPageToken) => {
    try {
        const listUsersResult = await auth.listUsers(1000, nextPageToken);
        const users = listUsersResult.users.map(user => ({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
        }));
        return { users, nextPageToken: listUsersResult.pageToken };
    } catch (error) {
        console.error("Error listing users:", error);
        throw error;
    }
}




module.exports = {
    getUserAuth,
    getUserAuthByEmail,
    createUserAuth,
    deleteUserAuth,
    updateUserAuth,
    resetPassword,
    updateUserAuthPassword,
    updateUserAuthEmail,
    updateUserAuthDisplayName,
    updateUserAuthDisabled,
    updateUserAuthCustomClaims,
    updateUserAuthTokens,
    updateUserAuthTokensValid,
    updateUserAuthTokensInvalid,
    updateUserAuthTokensExpired,
    updateUserAuthTokensRevoked,
    updateUserAuthTokensBlacklisted,
    updateUserAuthTokensWhitelisted,
    listAllUsers
};