const User = require('../models/User');

/**Get token from model, create cookie and send response*/
const sendTokenResponse = (user, statusCode, res) => {

    //create token
    const token = user.getSignedJwtToken();
    console.log(token);
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({success: true, token});

}

/**Register new user*/
exports.register = async (req, res) => {
    try {
        console.log(req.body);
        const {name, email, password} = req.body;

        const user = await User.create({name, email, password});
        //create token
        sendTokenResponse(user, 200, res);
        const myUser = await User.findByIdAndUpdate(user.id, {token});

    } catch (err) {
        res.status(500).json({success: false, msg: err.message});
    }
}

/**Login user*/
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        //Validate email and password
        if (!email || !password) {
            res.status(400).json('Please provide email and password.')
        }

        //check user
        const user = await User.findOne({email}).select('+password');

        if (!user) {
            res.status(401).json('Doesnt exist such user');
        }
        //check password

        const match = await user.matchPassword(password);

        if (!match) {
            res.status(401).json('Doesnt exist such user');
        }
        //create token
        sendTokenResponse(user, 200, res);
    } catch (err) {

        res.status(500).json({success: false, msg: err.message});
    }
}

/** Get current logged in user*/
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({success: true, data: user});
    } catch (err) {
        res.status(400).json({success: false, msg: err.message});
    }

}
/**LogOut User*/
exports.logout = async (req, res) => {
    try {
        res.cookie('token', 'none', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
        })
        console.log(req.header('Authorization'));
        res.status(200).json({success: true, msg: "logged out"});
    } catch (err) {
        res.status(404).json({success: false, msg: err.message})
    }

}

