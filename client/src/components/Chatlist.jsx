// src/components/ChatList.js
import React, { useEffect, useState } from "react";
import avtar from "../assets/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { currentFriendReducer } from "../store/reducers/currentFriendReducer";
import { CURRENT_FRIEND_SELECT } from "../store/types/messengerType";
import { getAllMessage } from "../store/actions/messengerAction";

const ChatList = ({ activeUser }) => {
    const [activeUsers, setActiveUsers] = useState([]);
    useEffect(() => {
        setActiveUsers(activeUser);
    }, [activeUser]);
    const isUserActive = (userId) => {
        return activeUsers.some((user) => user.userId === userId);
    };
    const { myInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    useEffect(() => {
        if (myInfo.id) {
            dispatch(getAllMessage({ userId: myInfo.id }));
        }
    }, [dispatch, myInfo.id]);
    const lastMessage = useSelector((state) => state.messenger.lastMessage);
    console.log(lastMessage);
    function formatDateTime(timestamp) {
        if(!timestamp){
            return timestamp=new date();
        }
        const date = new Date(timestamp);
        const now = new Date();
        const differenceInMilliseconds = now - date;
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    
        if (differenceInMilliseconds < oneDayInMilliseconds) {
            const hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two digits
            const period = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12; // Convert 0 to 12-hour format
            return `${formattedHours}.${minutes} ${period}`;
        } else {
            const month = date.toLocaleString('en-US', { month: 'long' });
            const day = date.getDate();
            return `${month} ${day}`;
        }
    }
    // console.log(lastMessage.find(element => element.senderId ==="667b9a82f9b265995e166178").message.text)
    
    const { friends } = useSelector((state) => state.messenger);
    console.log(friends)
    const sortedFriends = [...friends].sort((a, b) => {
        return b.lastMessageTimestamp - a.lastMessageTimestamp; // Descending order
    });
    return (
        <div className="flex-1 overflow-y-auto">
            {friends && friends.length > 0
                ? friends.map((friend, index) => (
                      <div
                          key={index}
                          className="p-2 border-b border-gray-700 hover:bg-gray-700 flex h-auto "
                          onClick={() =>{
                              dispatch({
                                  type: CURRENT_FRIEND_SELECT,
                                  payload: {
                                      currentFriend: friend,
                                  },
                              })
                            }
                          }
                      >
                          <div className="flex items-center p-4 relative">
                              <img src={avtar} alt="Rona Zepri" className="w-12 h-12 rounded-full mr-4" />
                              {isUserActive(friend._id) && <div className="w-4 h-4 rounded-full bg-green-500 absolute top-4 right-4 active-status"></div>}
                          </div>
                          <div className=" w-[100%] flex flex-col my-auto">
                              <div className="flex justify-between items-center w-[100%]">
                                  {" "}
                                  <div className="font-bold">{friend.userName}</div>
                                  {/* <div className="text-xs text-gray-500 ">{formatDateTime(lastMessage.find(element => element.senderId ===friend._id).updatedAt)}</div> */}
                              </div>
                              <div className="text-sm text-gray-400 text-left">{(lastMessage.find(element => element.senderId ===friend._id)?lastMessage.find(element => element.senderId ===friend._id).message.text:"").slice(0,20)}</div>
                          </div>
                      </div>
                  ))
                : "No Friends"}
        </div>
    );
};

export default ChatList;
