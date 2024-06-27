// src/components/Sidebar.js
import React from 'react';
import ChatList from './Chatlist';
import avtar from '../assets/avatar.png'
import threeDot from '../assets/threeDot.png'
import { useSelector } from 'react-redux';

const Sidebar = ({activeUser}) => {
  const {myInfo}=useSelector(state=>state.auth);
  return (
    <div className="xl:w-[25%] bg-gray-800 text-white flex flex-col rounded-xl w-[90%] md:w-[40%] xl:max-w-[30rem]">
      <div className="flex items-center p-3 justify-between">
        <div className='flex items-center'>
        <img src={avtar} alt="Rona Zepri" className="w-12 h-12 rounded-full mr-4 " />
        <span>{myInfo.userName}</span>
        </div>
        <img className='w-8 h-8 cursor-pointer' src={threeDot} alt=""  />

      </div>
      <div className="flex justify-between p-4 border-b border-gray-700">
                <input type="text"  className=" w-[98%] h-10 rounded-[3.5rem] text-center bg-[#555]"  placeholder="search"/ >
            </div>
      <ChatList activeUser={activeUser} />
    </div>
  );
};

export default Sidebar;
