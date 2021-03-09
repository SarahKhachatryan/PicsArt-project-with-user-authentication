const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth');
const{
    getPosts,
    getPost,
    createPost,
    editPost,
    deletePost,
    addPhotoToPost,
    getPhoto,
    searchByDescription,
    deletePhoto,
    updatePhoto,
    getRecentPosts
} = require('../controllers/posts');

router
    .route('/')
    .post(protect,createPost)
    .get(getPosts)

router.delete('/:id/:fileName',protect,deletePhoto);
router.put('/:id/:fileName',protect,updatePhoto);

router
    .route('/:id')
    .put(protect,editPost)
    .delete(protect,deletePost)
    .get(protect,getPost);

router.route('/search/:desc')
    .get(searchByDescription);

router.route('/:id/photo')
    .post(protect,addPhotoToPost)
    .get(protect,getPhoto);

router.get('/recent/:num',getRecentPosts)

module.exports = router;
