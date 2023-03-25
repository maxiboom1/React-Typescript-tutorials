import http from "http"
import socketIo from "socket.io";

function init(httpServer: http.Server): void{

    // CORS options:
    const options = { cors: { origin: "*" } };

    // Create socket.io server:
    const socketServer = new socketIo.Server(httpServer, options);

    // 1. Listen to client connections:
    socketServer.sockets.on("connection", (socket: socketIo.Socket)=>{
        
        console.log("Client has been connected");

        //Listen to specific client messages
        socket.on("msg-from-client",(msg: string)=>{
            console.log('Message: ' + msg);
        });

        // 6. Send from server to client:
        const timerId = setInterval(()=>{
            socket.emit("msg-from-server", "This is message from server!");
        },3000);

        //7. Listen to specific client disconnect:
        socket.on("disconnect", ()=>{
            console.log('client has been disconnected');
            clearInterval(timerId);
        });
        
    })

}

export default {
    init
};