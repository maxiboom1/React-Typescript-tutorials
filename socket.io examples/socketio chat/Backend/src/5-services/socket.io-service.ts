import http from "http"
import socketIo from "socket.io";
import MessageModel from "../2-models/message-model";

function init(httpServer: http.Server): void{

    // CORS options:
    const options = { cors: { origin: "*" } };

    // Create socket.io server:
    const socketServer = new socketIo.Server(httpServer, options);

    // 1. Listen to client connections:
    socketServer.sockets.on("connection", (socket: socketIo.Socket)=>{
        
        console.log("Client has been connected");

        //Listen to specific client messages
        socket.on("msg-from-client",(msg: MessageModel)=>{
            
            console.log('Message: ', msg);
            
            socketServer.sockets.emit("msg-from-server", msg);
        });

        //7. Listen to specific client disconnect:
        socket.on("disconnect", ()=>{
            console.log('client has been disconnected');
        });
        
    })

}

export default {
    init
};