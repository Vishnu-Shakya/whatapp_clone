const validator = require('validator');
const registerModel = require('../models/authModel');
const fs = require('fs');
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
            res.status(400).json({
                error: {
                    errorMessage: error
                }
            });
        } else {
            try {
                const foundUser = await registerModel.findOne({ email: email });
                if (foundUser) {
                    console.log(foundUser)
                    res.status(404).json({
                        error: {
                            errorMessage: ['Your email already exists']
                        }
                    });
                } else {
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

                        res.status(201).json({

                            successMessage: "User Create successfully"
                            ,
                            token
                        })

                    }
                    else {
                        res.status(404).json({
                            error: {
                                errorMessage: ['Database error']
                            }
                        })
                    }
                }
            } catch (error) {
                console.log(error)
                res.status(500).json({ error });
            }
        }
    } catch (err) {
        res.status(400).json({
            error: {
                errorMessage: ['Internal Server Error']
            }
        });
    }
};

module.exports = {
    userRegister,
};
