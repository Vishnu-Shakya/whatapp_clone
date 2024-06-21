import React from "react";

import Sidebar from "./Sidebar";
import Chatwindow from "./Chatwindow";

const Messenger = () => {
    return (
        <div className="flex h-screen font-sans  justify-around py-8 bg-[#222]">
            <Sidebar />
            <Chatwindow />
        </div>
    );
};

export default Messenger;
