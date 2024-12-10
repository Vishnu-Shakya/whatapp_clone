import React, { useState, useEffect, useRef } from 'react';
import { FaPhoneAlt, FaVideo, FaInfo, FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaVolumeMute, FaExpand } from "react-icons/fa";
import Peer from 'peerjs';
import avatar from '../assets/avatar.png';
import FriendInfo from './FreindInfo.jsx';
import Message from './Message';
import { useSelector } from 'react-redux';
import MessageSend from './MessageSend';
import axios from 'axios';

const Chatwindow = ({ socket,activeUser }) => {
  const [activeUsers, setActiveUsers] = useState([]);
  useEffect(() => {
      setActiveUsers(activeUser);
  }, [activeUser]);
  const { currentFriend } = useSelector(state => state.currentFriend);
  const { userId } = useSelector(state => state.auth); // Assuming you have auth state with userId
  const [peer, setPeer] = useState(null);
  const [currentCall, setCurrentCall] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const isUserActive = (userId) => {
    return activeUsers.some((user) => user.userId === userId);
};

  useEffect(() => {
    const newPeer = new Peer(userId, {
      host: 'localhost',
      port: 5000,
      path: '/peerjs',
      config: {
        'iceServers': [
          { url: 'stun:stun.l.google.com:19302' }
        ]
      }
    });

    newPeer.on('open', id => {
      console.log('Peer ID: ', id);
    });

    newPeer.on('call', call => {
      console.log('Receiving a call');
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        localVideoRef.current.srcObject = stream;
        call.answer(stream);
        call.on('stream', remoteStream => {
          remoteVideoRef.current.srcObject = remoteStream;
        });
        setCurrentCall(call);
        setIsFullscreen(true);
      });
    });

    setPeer(newPeer);

    return () => {
      newPeer.destroy();
    };
  }, [userId]);

  // const startCall = () => {
  //   console.log('Starting a call');
  //   axios.get(`/getPeerId/${currentFriend.userId}`).then(response => {
  //     const friendPeerId = response.data.peerId;
  //     console.log('Friend Peer ID: ', friendPeerId);
  //     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
  //       localVideoRef.current.srcObject = stream;
  //       const call = peer.call(friendPeerId, stream);
  //       call.on('stream', remoteStream => {
  //         remoteVideoRef.current.srcObject = remoteStream;
  //         console.log('Receiving remote stream');
  //       });
  //       setCurrentCall(call);
  //       setIsFullscreen(true);
  //     }).catch(error => {
  //       console.error('Error accessing media devices.', error);
  //     });
  //   }).catch(error => {
  //     console.error('Error getting friend peer ID.', error);
  //   });
  // };

  // const stopCall = () => {
  //   if (currentCall) {
  //     currentCall.close();
  //     setCurrentCall(null);
  //   }
  //   if (localVideoRef.current && localVideoRef.current.srcObject) {
  //     localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
  //   }
  //   if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
  //     remoteVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
  //   }
  //   setIsFullscreen(false);
  // };

  const toggleMute = () => {
    const stream = localVideoRef.current.srcObject;
    stream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
    setIsMuted(!isMuted);
  };

  const toggleSpeaker = () => {
    const stream = remoteVideoRef.current.srcObject;
    stream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
    setIsSpeakerOn(!isSpeakerOn);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="hidden md:flex xl:w-3/4 w-full">
      {currentFriend ? (
        <div className="h-full w-full">
          <div className="flex h-full w-full">
            <div className="transition-all duration-500 xl:w-2/3 w-full ">
              <div className="h-full ml-4 flex flex-col justify-between bg-gray-800 rounded-md p-4">
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center">
                    <div className="relative w-10 h-10">
                      <img src={avatar} alt="" className="w-10 h-10 rounded-full" />
                      {isUserActive(currentFriend._id) && <div className="absolute w-2.5 h-2.5 rounded-full bg-green-500 bottom-0 right-0"></div>}
                    </div>
                    <div className="flex items-center justify-center ml-2">
                      <h3 className="text-white">{currentFriend.userName}</h3>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex justify-center items-center h-9 w-9 rounded-full bg-gray-200 text-gray-600 cursor-pointer ml-2">
                      <FaPhoneAlt />
                    </div>
                    <div
                      className="flex justify-center items-center h-9 w-9 rounded-full bg-gray-200 text-gray-600 cursor-pointer ml-2"
                      // onClick={startCall}
                    >
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
        </div>
      ) : (
        <div className='w-full flex text-white text-2xl h-full justify-center items-center'>
          Please select a friend
        </div>
      )}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
          <video ref={localVideoRef} className="absolute left-4 bottom-4 w-1/4 h-1/4 bg-gray-800" autoPlay muted></video>
          <video ref={remoteVideoRef} className="w-full h-full" autoPlay></video>
          <div className="absolute top-4 right-4 flex space-x-4">
            <button onClick={stopCall} className="p-2 bg-red-600 text-white rounded-full">
              End Call
            </button>
            <button onClick={toggleMute} className="p-2 bg-gray-600 text-white rounded-full">
              {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </button>
            <button onClick={toggleSpeaker} className="p-2 bg-gray-600 text-white rounded-full">
              {isSpeakerOn ? <FaVolumeUp /> : <FaVolumeMute />}
            </button>
            <button onClick={toggleFullscreen} className="p-2 bg-gray-600 text-white rounded-full">
              <FaExpand />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatwindow;
