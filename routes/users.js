const express = require('express');
const router = express.Router();
const {protect}= require('../middleware/auth')
const{getPosts,updateUser,updatePassword,searchUsers}= require('../controllers/users');

router.get('/posts',protect,getPosts);
router.put('/update',protect,updateUser);
router.put('/updatePassword',protect,updatePassword);
router.get('/:name',protect,searchUsers);
module.exports = router;