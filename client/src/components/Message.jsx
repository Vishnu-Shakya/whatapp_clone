import React, { useEffect, useRef, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import avatar from "../assets/avatar.png";
import avatar2 from "../assets/avatar2.jpg";
import { getMessage } from "../store/actions/messengerAction";



const Message = ({ currentFriend,socket }) => {
    const dispatch = useDispatch();
    const scrollRef = useRef();
    const [messages, setMessages] = useState([]);

    const { myInfo } = useSelector(state => state.auth);
    const storeMessages = useSelector(state => state.messenger.messages);

    useEffect(() => {
        if (currentFriend?._id) {
            const data = {
                fdId: currentFriend._id,
                myId: myInfo.id
            };
            dispatch(getMessage(data));
        }
    }, [currentFriend?._id, dispatch, myInfo.id]);

    useEffect(() => {
        setMessages(storeMessages);
    }, [storeMessages]);


   
   
    

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <>
            <div className="message-show h-[60vh] p-2 overflow-y-auto">
                {messages.map((m, index) =>
                    m.senderId === myInfo.id ? (
                        <div key={m.id} className="w-full flex justify-end mb-4" ref={scrollRef}>
                            <div className="my-message w-3/4 md:w-1/2 lg:w-1/3">
                                <div className="image-message flex justify-end">
                                    <div className="my-text flex flex-col items-end">
                                        <p className="message-text text-right p-2 rounded-lg bg-gray-800 text-white">
                                            {m.message.text === "" ? <img src={avatar} className="w-56 h-68 object-cover rounded" alt="" /> : m.message.text}
                                        </p>
                                        {index === messages.length - 1 && m.senderId === myInfo.id ? (
                                            m.status === "seen" ? (
                                                <img className="img w-3.5 h-3.5 rounded-full mt-1" src={avatar2} alt="" />
                                            ) : m.status === "delivered" ? (
                                                <span className="mt-1">
                                                    <FaRegCheckCircle />
                                                </span>
                                            ) : (
                                                <span className="mt-1">
                                                    <FaRegCheckCircle />
                                                </span>
                                            )
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                <div className="time text-right py-1 text-gray-600 text-xs">
                                    {new Date(m.createdAt).toLocaleTimeString()}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div key={m.id} className="w-full flex justify-start mb-4" ref={scrollRef}>
                            <div className="fd-message w-3/4 md:w-1/2 lg:w-1/3">
                                <div className="image-message-time flex">
                                    <img src={avatar2} className="w-8 h-8 rounded-full mr-2" alt="" />
                                    <div className="message-time flex flex-col items-start">
                                        <p className="message-text text-left p-2 rounded-lg bg-gray-800 text-white">
                                            {m.message.text === "" ? <img src={avatar} className="w-56 h-68 object-cover rounded" alt="" /> : m.message.text}
                                        </p>
                                        <div className="time text-left py-1 text-gray-600 text-xs">
                                            {new Date(m.createdAt).toLocaleTimeString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </>
    );
};

export default Message;
