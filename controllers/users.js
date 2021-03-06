const User = require('../models/User');
const Post = require('../models/Post');


/**Get user's all posts*/
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find({user: req.user.id}).exec();
        console.log(posts);
        res.status(200).json({success: true, data: posts});
    } catch (err) {
        res.status(404).json({success: false, msg: err.message});
    }
}

/**Update user*/

exports.updateUser = async (req, res) => {
    try {
        const fieldsToUpdate = {
            name: req.body.name,
            email: req.body.email,

        }
        const myUser = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: myUser
        });
    } catch (err) {
        res.status(404).json({success: false, msg: err.message});
    }
}

/**Update password*/
exports.updatePassword = async (req, res) => {
    try {
        const myUser = await User.findById(req.user.id).select('+password');

        if (!(await myUser.matchPassword(req.body.currentPassword))) {
            res.status(404).json({success: false, msg: "Incorrect password"});
        }
        myUser.password = req.body.newPassword;
        await myUser.save();

        res.status(200).json({
            success: true,
            data: myUser
        });
    } catch (err) {
        res.status(404).json({success: false, msg: err.message});
    }
}

/**Search other users by their name*/
exports.searchUsers = async (req, res) => {
    try {
        const users =await  User.find({name: req.params.name});
        res.status(200).json({success: true, data: users});

    } catch (err) {
        res.status(500).json({success: false, msg: err.message});

    }
}

