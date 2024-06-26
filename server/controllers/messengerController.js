const registerModel = require('../models/authModel');
const messageModel = require('../models/messageModel');
const { get } = require('../routes/authRoute');

const getFriends = async (req, res) => {
    try {
        const friends = await registerModel.find({});
        // console.log(friends)
        res.status(200).json({
            success: true,
            friends: friends
        })
    } catch (error) {
        res.status(500).json({
            error: {
                errorMessage: ['Internal Server Error']
            }
        })

    }

};
const sendMessage = async (req, res) => {
    const { senderId, receiverId, message } = req.body;
    try {
        const insertMessage = await messageModel.create({
            senderId: senderId,
            receiverId, receiverId,
            message: {
                text: message,
                image: ""
            }
        })
        if (insertMessage) {
            res.status(200).json({
                success: true,
                message: insertMessage
            })
        }
        else {
            res.status(404).json({
                error: {
                    errorMessage: ['Internal Databases Error']
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            error: {
                errorMessage: ['Interval Server Error']
            }
        })

    }
};

const getMessage = async (req, res) => {
    const { fdId, myId } = req.body;
    console.log(req.body);
    try {
        var getAllmessage = await messageModel.find({})
        getAllmessage = getAllmessage.filter(m => ((m.senderId === myId && m.receiverId === fdId) || (m.senderId === myId && m.receiverId === myId)))
        res.status(200).json({
            success: true,
            messages: getAllmessage
        })
    } catch (error) {
        res.status(500).json({
            error: {
                errorMessage: ['Internal Servre Error']
            }
        })
    }

};


module.exports = {
    getFriends,
    sendMessage,
    getMessage
};
