const express = require('express');
const { userRegister,userLogin } = require('../controllers/authController');
const {getFriends, sendMessage,getMessage,getAllMessage} =require('../controllers/messengerController')
const upload = require('../middlewares/uploadImage'); 
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', upload, userRegister);
router.post('/login', userLogin);

// for messenger
router.get('/get-friends',authMiddleware, getFriends);
router.post('/send-message',sendMessage);
router.post('/get-message',getMessage);
router.post('/get-all-message',getAllMessage);



module.exports = router;
