const socketIo = require('socket.io');

const socketfun = (server) => {
    let users = [];
    const isFriendActicve=(id)=>{
        return users.find(u=>u.userId===id);
    }
    const addUser = (userId, socketId, userInfo) => {
        const checkUser = users.some(u => u.userId === userId);
        if (!checkUser) {
            users.push({ userId, socketId, userInfo });
            console.log(userId)
        }
    }
    const io = socketIo(server, {
        cors: {
            origin: "https://whataapp.vercel.app/",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('addUser', (userId, userInfo) => {
            addUser(userId, socket.id, userInfo);
            io.emit('getUser', users);
        });
        socket.on('sendMessage',data=>{
            console.log(data);
            const user=isFriendActicve(data.receiverId);
            if(user!==undefined){
                console.log("yes");
                console.log(user.socketId);
                socket.to(user.socketId).emit('getMessage',{
                    senderId:data.senderId,
                    receiverId:data.receiverId,
                    message:data.message,
                    createdAt:data.time,
                })
            }
        })

        socket.on('disconnect', () => {
            users = users.filter(u => u.socketId !== socket.id);
            io.emit('getUser', users);
            console.log('user disconnected');
        });
    });
}

module.exports = socketfun;
