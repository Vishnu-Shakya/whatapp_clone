import React, { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Chatwindow from "./Chatwindow";
import {useDispatch} from 'react-redux';
import { getFriends } from "../store/actions/messengerAction";

const Messenger = () => {

    

   
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getFriends());
    },[])
    return (
        <div className="flex h-screen font-sans  justify-around py-8 bg-[#222]">
            <Sidebar />
            <Chatwindow />
        </div>
    );
};

export default Messenger;
