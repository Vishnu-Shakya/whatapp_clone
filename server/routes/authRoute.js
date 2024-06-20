const express = require('express');
const { userRegister } = require('../controllers/authController');
const upload = require('../middlewares/uploadImage'); 
const router = express.Router();

router.post('/register', upload, userRegister);

module.exports = router;
