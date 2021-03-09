const Post = require('../models/Post');
const path = require('path');
const fs = require('fs');

/** Get all posts*/
exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(201).json({success: true, data: posts});
    } catch (err) {
        res.status(500).json({success: false, msg: err.message});
    }
}

/**Create a post*/
exports.createPost = async (req, res, next) => {
    try {
        //add user to req.body
        req.body.user = req.user.id;
        console.log(req.body);
        const post = await Post.create(req.body);
        res.status(201).json({success: true, data: post});

    } catch (err) {
        res.status(500).json({success: false, msg: err.message});
    }
}
/**Update post*/
exports.editPost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true,
                runValidators: true
            })
        res.status(200).json({success: true, data: post});
    } catch (err) {
        res.status(500).json({success: false, msg: err.message});
    }
}
/**Update Post's Photo*/
exports.updatePhoto = async (req, res, next) => {

}
/**Delete post*/
exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({success: true, msg: 'Post deleted.'});
    } catch (err) {
        res.status(500).json({success: false, msg: err.message});
    }
}
/**Add photo*/
exports.addPhotoToPost = async (req, res, next) => {

    try {
        const post = await Post.findById(req.params.id);
        const file = req.files.file;
        if (!post) {
            res.status(404).json({success: false, msg: "No such post."});
        }
        if (!req.files) {
            res.status(400).json({success: false, msg: 'Please upload a file.'})
        }
        if (!file.mimetype.startsWith('image')) {
            res.status(400).json({success: false, msg: 'Please upload an image file.'})
        }
        // file.name = `photo_${post._id}${path.parse(file.name).ext}`;

        file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
            const arr = post.photo;
            arr.push(file.name);
            await Post.findByIdAndUpdate(req.params.id, {photo: arr});
            res.status(200).json({success: true, data: file.name});
        });
    } catch (err) {
        res.status(500).json({success: false, msg: err.message});
    }
}

/**Get post's photos*/
exports.getPhoto = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post.photo);
    } catch (err) {
        res.status(404).json({success: false, msg: err.message});
    }
}

/**Search post by description*/
exports.searchByDescription = async (req, res, next) => {
    try {
        const posts = await Post.find();
        const arr = [];
        for (let i = 0; i < posts.length; i++) {
            if (typeof (posts[i].description) !== 'undefined') {
                if (posts[i].description.includes(req.params.desc)) {
                    arr.push(posts[i]);
                }
            }
        }

        res.status(200).json({success: true, data: arr});
    } catch (err) {
        res.status(404).json({success: false, msg: err.message});
    }
}

/** Get post by id*/
exports.getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({success: true, data: post});
    } catch (err) {
        res.status(500).json({success: false, msg: err.message});
    }
}
/**Get post's photos*/
exports.getPhoto = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({success: true, data: post.photo});
    } catch (err) {
        res.status(200).json({success: false, msg: err.message});
    }
}

/**Update photo*/
exports.updatePhoto = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        const photoName = req.params.fileName;
        const file = req.files.file;
        for (let i = 0; i < post.photo.length; i++)
            if (post.photo[i] === photoName) {
                post.photo.splice(i, 1, file.name);
                fs.unlinkSync(`./public/uploads/${photoName}`, (err => {
                }))
            }
        file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {

        });
        res.status(200).json({success: true, data: post.photo});
    } catch (err) {
        res.status(404).json({success: false, msg: err.message});

    }
}

/**Delete photo*/
exports.deletePhoto = async (req, res, next) => {
    try {
        const photoName = req.params.fileName
        const post = await Post.findById(req.params.id);
        for (let i = 0; i < post.photo.length; i++)
            if (post.photo[i] === photoName) {
                post.photo.splice(i, 1);
                fs.unlinkSync(`./public/uploads/${photoName}`, (err => {
                }))
            }
        res.status(200).json({success: true, data: post.photo});
    } catch (err) {
        res.status(404).json({success: false, msg: err.message});

    }
}

/**Get recent posts*/
exports.getRecentPosts = async (req, res)=>{

    try{
        const posts = await Post.find();
        const arr = posts.splice(posts.length-req.params.num).reverse();
        res.status(200).json({success: true, data: arr});

    }catch(err){
        res.status(404).json({success: false, msg: err.message});

    }
}
