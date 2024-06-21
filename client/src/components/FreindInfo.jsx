import React from 'react';
import { FaCaretSquareDown } from "react-icons/fa";
import avatar from '../assets/avatar.png'

const FriendInfo = ({ currentfriend, activeUser, message }) => {
  return (
    <div className="p-3 hidden xl:flex flex-col h-full w-[calc(33%-4rem)] rounded-md bg-gray-800 ml-4 text-white">
      <input type="checkbox" id="gallery" className="hidden" />
      <div className="flex flex-col items-center">
        <div className="h-16 w-16 rounded-full overflow-hidden mb-1.5">
          <img src={avatar} alt="" className="w-full h-full" />
        </div>
        
          <div className="text-green-500 mb-1">Active</div>
        
        <div className="text-center">
          <h4 className="font-semibold text-gray-800 mb-2">Vishnu Shakya</h4>
        </div>
      </div>

      <div className="flex flex-col mt-2">
        <div className="flex justify-between  cursor-pointer mb-1 text-white">
          <h3 className="text-sm">Customize Chat</h3>
          <FaCaretSquareDown />
        </div>

        <div className="flex justify-between text-white cursor-pointer mb-1">
          <h3 className="text-sm">Shared Media</h3>
          <label htmlFor="gallery" className="cursor-pointer">
            <FaCaretSquareDown />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1.5 overflow-y-auto" id="galleryContent">
        {/* {message && message.length > 0 && message.map((m, index) => (
          m.message.image && <img key={index} src={`./image/${m.message.image}`} className="w-full h-full" alt="" />
        ))} */}
      </div>
    </div>
  );
};

export default FriendInfo;
