import { use } from "react"
import User from "../models/User"

const GetUserdetails = async (userId) => {
    try {
        const user = await User.findById(userId).select('-password')
        if (!user){
            throw new Error("User not Found.");
        }
        return user;
    } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`)
    }
};

const createUser = async (userData) => {
    try {
        // check if user already exists
        const existingUser = await User.findOne({email: userData.email});
        if (existingUser){
            throw new Error("User with this Email already exists.");
        }

        // actual Save
        const newUser =  new User({ userData });
        newUser.save();

        // response
        const {password, ...userWithoutPassword} = newUser.toObject()
        return userWithoutPassword;

    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
}

const updateUser = async (userId, updates) => {
    try {
        if(updates.password){
            throw new Error("Use ChangePassword Service to update password");
        }
        const updateUser = await User.findByIdAndUpdate(
            userId, 
            {$set: updates }, 
            { new: true, runValidators: true }
        ).select("-password");

        if (!updateUser){
            throw new Error("User not Found");
        }

        return updateUser;


    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
}

// GetUserdetails
// createuser
// updateUser
// deleteUser
//changepassword