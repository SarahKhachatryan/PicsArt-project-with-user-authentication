const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Protect routes

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    //make sure token exists

    if (!token) {
        res.status(401).json({success: false, msg: "not authorized to use this routes"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        res.status(401).json({success: false, msg: "not authorized to use this routes"})

    }
}