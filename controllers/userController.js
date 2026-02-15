export const getUserProfile = (req, res) => {
    res.json(req.user);
};

export const getMyProfile = async (req, res) => {
    res.json(req.user);
};
import User from "../models/User.js";

export const updateMyProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

if (!user) {
    return res.status(404).json({ message: "User not found" });
    }

    // update only if provided
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.avatar = req.body.avatar || user.avatar;
    user.bio = req.body.bio || user.bio;
    
    if (req.body.settings) {
        user.settings = { ...user.settings, ...req.body.settings };
    }

    if (req.body.password) {
        user.password = req.body.password; 
    }

    const updatedUser = await user.save();

    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        avatar: updatedUser.avatar,
        bio: updatedUser.bio,
        settings: updatedUser.settings
    });
};
