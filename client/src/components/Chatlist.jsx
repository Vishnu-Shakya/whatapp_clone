// src/components/ChatList.js
import React, { useEffect, useState } from "react";
import avtar from "../assets/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { currentFriendReducer } from "../store/reducers/currentFriendReducer";
import { CURRENT_FRIEND_SELECT } from "../store/types/messengerType";

const ChatList = () => {
    const chats = [
        { name: "Fabio Gramer", message: "UI designer is the best job...", time: "14:22" },
        { name: "Georgia", message: "Today is I'm very happy cos...", time: "Jul 12" },
        { name: "Queen", message: "Hello dear 😍", time: "Jul 10" },
        { name: "Bob David", message: "Typing...", time: "Jul 08" },
        { name: "Jimmy Oliver", message: "Hey, I have job for you", time: "May 29" },
        { name: "Alice Amel", message: "Can you help me?", time: "May 29" },
        { name: "Alice Amel", message: "Can you help me?", time: "May 29" },
        { name: "Alice Amel", message: "Can you help me?", time: "May 29" },
        { name: "Alice Amel", message: "Can you help me?", time: "May 29" },
    ];

    const { friends } = useSelector((state) => state.messenger);
    const dispatch = useDispatch();
    return (
        <div className="flex-1 overflow-y-auto">
            {friends && friends.length > 0
                ? friends.map((friend, index) => (
                      <div key={index} className="p-2 border-b border-gray-700 hover:bg-gray-700 flex h-auto " onClick={() => dispatch({
                        type: CURRENT_FRIEND_SELECT,
                        payload: {
                            currentFriend:friend
                        }
                    })}>
                          <div className="flex items-center p-4 relative">
                              <img src={avtar} alt="Rona Zepri" className="w-12 h-12 rounded-full mr-4" />
                              <div className="w-4 h-4 rounded-[50%] bg-green-500 absolute top-4 right-4"></div>
                          </div>
                          <div className=" w-[100%] flex flex-col my-auto">
                              <div className="flex justify-between items-center w-[100%]">
                                  {" "}
                                  <div className="font-bold">{friend.userName}</div>
                                  <div className="text-xs text-gray-500 ">{friend.updatedAt}</div>
                              </div>
                              <div className="text-sm text-gray-400 text-left">{chats[0].message.slice(0, 20)}</div>
                          </div>
                      </div>
                  ))
                : "No Friends"}
        </div>
    );
};

export default ChatList;
