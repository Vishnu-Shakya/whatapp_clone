import React, { useState } from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { messageSend } from '../store/actions/messengerAction';

const MessageSend = ({ socket }) => {
    const [message, setMessage] = useState('');
    const {myInfo}=useSelector(state=>state.auth);
    const {currentFriend}=useSelector(state=>state.currentFriend);
    const dispatch=useDispatch();

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const data={
            senderId:myInfo.id,
            receiverId:currentFriend._id,
            message:message?message:"Hi"
        }
        dispatch(messageSend(data));
        socket.current.emit("sendMessage",{
            senderId:myInfo.id,
            receiverId:currentFriend._id,
            time:new Date(),
            message:{
                text:data.message,
                image:""
            }
        });
        e.target.value="'

        
    };

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log(message)
            handleSendMessage(e);
        }
    };

    return (
        <div className="flex items-center p-4 bg-gray-800 rounded-lg">
            <input
                type="text"
                value={message}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Write message"
                className="flex-grow px-4 py-2 mr-2 bg-gray-700 text-white rounded-lg focus:outline-none"
            />
            <button onClick={handleSendMessage} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </button>
            <button className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 focus:outline-none ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 7.232l-4.5 4.5m0 0l-4.5 4.5m4.5-4.5L15.232 7.232m-4.5 4.5L9 17H5v-4l6.732-6.732a2.828 2.828 0 014 0L18 5.232a2.828 2.828 0 010 4L15.232 10.5z" />
                </svg>
            </button>
            <button className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 focus:outline-none ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11V3m0 0L8.5 6.5M12 3l3.5 3.5M19.02 12.93a2.49 2.49 0 00-2.56-.92l-2.25.6a2.5 2.5 0 00-1.59 1.24l-.9 2.07a8.01 8.01 0 01-3.51 3.51l-2.07.9a2.5 2.5 0 00-1.24 1.59l-.6 2.25a2.49 2.49 0 00.92 2.56 2.49 2.49 0 002.56.92l2.25-.6a2.5 2.5 0 001.59-1.24l.9-2.07a8.01 8.01 0 013.51-3.51l2.07-.9a2.5 2.5 0 001.24-1.59l.6-2.25a2.49 2.49 0 00-.92-2.56z" />
                </svg>
            </button>
        </div>
    );
};

export default MessageSend;
