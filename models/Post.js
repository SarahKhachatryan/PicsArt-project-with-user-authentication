const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    description:
        {
            type: String,
            maxlength: [100, "Description can't be more than 100 characters."]
        },
    photo:[{}],
    time: {
        type: Date,
        default: Date.now
    },
    user: {
            type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
        }

});
module.exports = mongoose.model('Post', postSchema);