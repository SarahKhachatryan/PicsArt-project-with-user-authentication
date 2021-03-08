const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Can't be blank"]
    },
    email: {
        type: String,
       required: [false, "Can't be blank"],
        unique:true,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Enter a valid email.']
    },
    password: {
        type:String,
        required:[true,'Please add a password.'],
        minlength: 6,
        select:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

/**Encrypt password*/
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

/**Sign JWT and return*/
userSchema.methods.getSignedJwtToken = function(){
 return jwt.sign({id: this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
}

/**Match passwords*/
userSchema.methods.matchPassword = async function (enteredPass){
     return await bcrypt.compare(enteredPass,this.password);
}

module.exports = mongoose.model('User', userSchema);