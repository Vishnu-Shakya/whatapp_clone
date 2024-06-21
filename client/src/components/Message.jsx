import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import avatar from "../assets/avatar.png";
import avatar2 from "../assets/avatar2.jpg";

const Message = () => {
    const myInfo = { id: 1, name: "Myself" };
    const currentfriend = { id: 2, userName: "John Doe", image: "john.jpg", createdAt: new Date() };
    const messages = [
        { id: 1, senderId: 1, message: { text: "Hello, John!", image: "" }, status: "seen", createdAt: new Date() },
        { id: 2, senderId: 2, message: { text: "", image: "sample-image.jpg" }, status: "delivered", createdAt: new Date() },
    ];
    const typingMessage = { senderId: 2, msg: true };

    return (
        <>
            <div className="message-show h-auto p-2 overflow-y-auto">
                {messages.map((m, index) =>
                    m.senderId === myInfo.id ? (
                        <div key={m.id} className="w-full flex justify-end mb-4">
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
                                    23:34
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div key={m.id} className="w-full flex justify-start mb-4">
                            <div className="fd-message w-3/4 md:w-1/2 lg:w-1/3">
                                <div className="image-message-time flex">
                                    <img src={avatar2} className="w-8 h-8 rounded-full  mr-2" alt="" />
                                    <div className="message-time flex flex-col items-start">
                                        <p className="message-text text-left p-2 rounded-lg bg-gray-300 text-black">
                                            {m.message.text === "" ? <img src={avatar} className="w-56 h-68 object-cover rounded" alt="" /> : m.message.text}
                                        </p>
                                        <div className="time text-left py-1 text-gray-600 text-xs">
                                            23:34
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
            

            {typingMessage && typingMessage.msg && typingMessage.senderId === currentfriend.id ? (
                <div className="typing-message p-2">
                    <div className="fd-message flex">
                        <div className="image-message-time flex">
                            <img src={avatar} className="w-8 h-8 rounded-full overflow-hidden mr-2" alt="" />
                            <div className="message-time flex flex-col items-start">
                                <p className="time text-gray-600 text-xs">Typing Message....</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Message;
