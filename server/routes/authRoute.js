const express = require('express');
const { userRegister,userLogin } = require('../controllers/authController');
const upload = require('../middlewares/uploadImage'); 
const router = express.Router();

router.post('/register', upload, userRegister);
router.post('/login', userLogin);

module.exports = router;
