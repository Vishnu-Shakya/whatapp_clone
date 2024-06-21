// src/components/Sidebar.js
import React from 'react';
import ChatList from './Chatlist';
import avtar from '../assets/avatar.png'
import threeDot from '../assets/threeDot.png'

const Sidebar = () => {
  return (
    <div className="xl:w-[25%] bg-gray-800 text-white flex flex-col rounded-xl w-[90%] xl:max-w-[30rem]">
      <div className="flex items-center p-8 justify-between">
        <div className='flex items-center'>
        <img src={avtar} alt="Rona Zepri" className="w-12 h-12 rounded-full mr-4 " />
        <span>Rona Zepri</span>
        </div>
        <img className='w-8 h-8 cursor-pointer' src={threeDot} alt=""  />

      </div>
      <ChatList />
    </div>
  );
};

export default Sidebar;
