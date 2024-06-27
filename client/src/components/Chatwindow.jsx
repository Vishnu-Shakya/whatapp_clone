import React from 'react';
import { FaPhoneAlt, FaVideo, FaRocketchat,FaInfo } from "react-icons/fa";

import avatar from '../assets/avatar.png'
import FriendInfo from './FreindInfo';
import Message from './Message';
import { useSelector } from 'react-redux';
import MessageSend from './MessageSend';

const Chatwindow = ({socket}) => {
  const {currentFriend}=useSelector(state=>state.currentFriend)
  // console.log(currentFriend)
  return (
    <div className="hidden md:flex xl:w-3/4 w-full">
      {currentFriend?(<div className="h-full w-full">
        <div className="flex h-full w-full">
          <div className="transition-all duration-500 xl:w-2/3 w-full ">
            <div className="h-full ml-4 flex flex-col justify-between bg-gray-800 rounded-md p-4">
              <div className="flex items-center justify-between p-3  ">
                <div className="flex items-center">
                  <div className="relative w-10 h-10">
                    <img src={avatar} alt="" className="w-10 h-10 rounded-full" />
                   
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-green-500 bottom-0 right-0"></div>
                   
                  </div>
                  <div className="flex items-center justify-center ml-2">
                    <h3 className="text-white">{currentFriend.userName}</h3>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex justify-center items-center h-9 w-9 rounded-full bg-gray-200 text-gray-600 cursor-pointer ml-2">
                    <FaPhoneAlt />
                  </div>
                  <div className="flex justify-center items-center h-9 w-9 rounded-full bg-gray-200 text-gray-600 cursor-pointer ml-2">
                    <FaVideo />
                  </div>
                  <div className="flex justify-center items-center h-9 w-9 rounded-full bg-gray-200 text-gray-600 cursor-pointer ml-2">
                      <FaInfo />
                  </div>
                </div>
              </div>
              <div className='h-full w-[94%] bg-[#222] mx-auto my-4 rounded-xl'>
              <Message currentFriend={currentFriend} socket={socket}></Message>
              </div>
              <MessageSend socket={socket}></MessageSend>

             

             
            </div>
            
          </div>
          <FriendInfo></FriendInfo>


          
        </div>


      </div>):<div className='w-full flex text-white text-2xl h-full justify-center items-center'>please select a frined</div>}
    </div>
  );
};

export default Chatwindow;
