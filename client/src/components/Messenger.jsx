import React, { useEffect, useRef, useState } from "react";

import Sidebar from "./Sidebar";
import Chatwindow from "./Chatwindow";
import {useDispatch, useSelector} from 'react-redux';
import { getFriends } from "../store/actions/messengerAction";
import { io } from 'socket.io-client';
import { useNavigate } from "react-router-dom";

const Messenger = () => {
    const [activeUser,setActiveUser]=useState([]);
    const {myInfo,authenticate}=useSelector(state=>state.auth);
    const {currentFriend}=useSelector(state=>state.currentFriend);
    const [socketMessage,setSocketMessage]=useState('');
    const socket=useRef();
    useEffect(()=>{
        if(socketMessage && currentFriend){
            if(socketMessage.receiverId=== myInfo.id && socketMessage.senderId===currentFriend._id){
                dispatch({
                    type:'SOCKET_MESSAGE',
                    payload:socketMessage
                })
            }
        }
    },[socketMessage])
    useEffect(() => {
        socket.current=io(import.meta.env.VITE_SERVER_URL)
        socket.current.on('getMessage',(data)=>{
            console.log(data)
            setSocketMessage(data);
        })
     }, []);

     useEffect(()=>{
        socket.current.emit('addUser',myInfo.id,myInfo);
    },[])

    useEffect(()=>{
        socket.current.on('getUser',users=>{
            const filterUser=users.filter(u=>u.userId!==myInfo.id)
            setActiveUser(filterUser);
        })
    })


    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getFriends());
    },[])
    const navigate=useNavigate();
    useEffect(()=>{
        if(!authenticate){
            navigate('/login');
        }
    })
    return (
        <div className="flex h-screen font-sans  justify-around py-8 bg-[#222]">
            <Sidebar activeUser={activeUser} />
            <Chatwindow socket={socket} activeUser={activeUser}  />
        </div>
    );
};

export default Messenger;
