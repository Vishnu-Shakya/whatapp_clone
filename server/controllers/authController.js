const validator = require('validator');
const registerModel = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRegister = async (req, res) => {
    try {
        const { userName, email, password, confirmPassword } = req.body;
        const image = req.file;
        const error = [];

        if (!validator.isEmail(email)) {
            error.push('Enter a Valid Email');
        }
        if (!image) {
            error.push('Please Provide an Image');
        }
        if (!image.filename) {
            error.push('Submit profile again');
        }
        if (error.length > 0) {
            return res.status(400).json({
                error: {
                    errorMessage: error
                }
            });
        }

        const foundUser = await registerModel.findOne({ email: email });
        if (foundUser) {
            console.log(foundUser)
            return res.status(404).json({
                error: {
                    errorMessage: ['Your email already exists']
                }
            });
        }

        console.log(image);
        const newUser = await registerModel.create({
            userName: userName,
            email: email,
            password: await bcrypt.hash(password, 10),
            imageUrl: image.filename
        });
        if (newUser) {
            const token = jwt.sign({
                id: newUser._id,
                email: newUser.email,
                userName: newUser.userName,
                image: newUser.imageUrl,
                registerTime: newUser.createdAt
            }, process.env.SECRET_JWT_KEY, {
                expiresIn: process.env.TOKEN_EXP
            });
            console.log(token);
            return res.status(201).json({
                successMessage: "User created successfully",
                token
            });
        } else {
            return res.status(404).json({
                error: {
                    errorMessage: ['Database error']
                }
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error });
    }
};

const userLogin = async (req, res) => {
    console.log(req.body);
    
    try {
        const { email, password } = req.body;
        const error = [];

        if (!validator.isEmail(email)) {
            error.push('Enter a Valid Email');
        }
        if (error.length > 0) {
            return res.status(400).json({
                error: {
                    errorMessage: error
                }
            });
        }

        const foundUser = await registerModel.findOne({ email: email }).select('+password');
        if (!foundUser) {
            return res.status(404).json({
                error: {
                    errorMessage: ['Your email doesn\'t exist']
                }
            });
        }
        
        else {
            console.log(password);
            const isMatch = await bcrypt.compare(password, foundUser.password);
            if (!isMatch) {
                return res.status(400).json({
                    error: {
                        errorMessage: ['Invalid credentials']
                    }
                });
            }

            const token = jwt.sign({
                id: foundUser._id,
                email: foundUser.email,
                userName: foundUser.userName,
                image: foundUser.imageUrl,
                registerTime: foundUser.createdAt
            }, process.env.SECRET_JWT_KEY, {
                expiresIn: process.env.TOKEN_EXP
            });

            res.cookie('autToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                sameSite: 'strict'
            });
            req.myId=foundUser._id;
            return res.status(200).json({
                successMessage: "User login successful",
                token
            });
        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({ error });
    }
};

module.exports = {
    userRegister,
    userLogin
};
