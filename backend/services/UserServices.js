import { use } from "react"
import User from "../models/User"

const userService = {
    GetUserdetails: async (userId) => {
        try {
            const user = await User.findById(userId).select('-password');
            if (!user){
                throw new Error("User not Found.");
            }
            const {password, ...userWithoutPassword} = user.toObject();

            return userWithoutPassword;
        } catch (error) {
            throw new Error(`Error fetching user: ${error.message}`);
        }
    },
    createUser: async (userData) => {
        try {
            // check if user already exists
            const existingUser = await User.findOne({email: userData.email});
            if (existingUser){
                throw new Error("User with this Email already exists.");
            }
    
            // actual Save
            const newUser =  new User(userData);
            newUser.save();
    
            // response
            const {password, ...userWithoutPassword} = newUser.toObject();
            return userWithoutPassword;
    
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    },
    updateUser: async (userId, updates) => {
        try {
            if(updates.password){
                throw new Error("Use ChangePassword Service to update password");
            }
            const updateUser = await User.findById(userId);
            if (!updateUser){
                throw new Error("User not Found");
            }
            Object.assign(user, updates);
            await user.save();
            const {password,...userWithoutPassword} = user.toObject();
            return userWithoutPassword;
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    },
    deleteUser: async (userId) => {
        try {
            // find user
            const user =  await User.findById(userId);
            if (!user) {
                throw new Error("User not Found");
            }

            // deactivate user
            user.is_active = false;
            await user.save();
            return true;

        } catch (error) {
            throw new Error(`Error Deleting User: ${error.message}`);
        }
    },
    changePassword: async (userId, currentPassword, newPassword) => {
        try {
            // find user
            const user =  await User.findById(userId);
            if (!user) {
                throw new Error("User not Found");
            }
            // match password
            const isMatch = await user.comparepassword(currentPassword);
            if(!isMatch){
                throw new Error("Current Password is incorrect");
            }
            user.password = newPassword;
            await user.save();
            return true;

        } catch (error) {
            throw new Error(`Error changing password: ${error.message}`);
        }
    }
}

export default userService;

// GetUserdetails
// createuser
// updateUser
// deleteUser
// changepassword