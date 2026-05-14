import User from "../models/User";
import userService from "../services/UserServices";

const userController = {
    getUserDetails: async (req, res) => {
        try {
            const userId = req.params.id; // http://localhost:3000/api/users/1
            // http://localhost:3000 - base url
            // /api - prefix
            // /users - endpoint
            // /1 - parameter
            const user = await userService.getUserDetails(userId);
            res.status(200).json({ status: "success", data: user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createUser: async (req, res) => {
        try {
            const userData = req.body;
            const user = await userService.createUser(userData);
            res.status(201).json({ status:"success", data:user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const updates = req.body;
            const user = await userService.updateUser(userId, updates);
            res.status(200).json({ status: "success", data: user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;
            await userService.deleteUser(userId);
            res.status(200).json ({status: "success"});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    changePassword: async (req, res) => {
        try {
            const userId = req.params.id;
            const {currentPassword, newPassword} = req.body;
            await userService.changePassword( userId, currentPassword, newPassword );
            res.status(200).json ({status: "success"});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}