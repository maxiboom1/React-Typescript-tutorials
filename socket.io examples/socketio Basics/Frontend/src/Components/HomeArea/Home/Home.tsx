import "./Home.css";
import {Socket, io} from "socket.io-client";

let socket: Socket;


function Home(): JSX.Element {
    
    function connect(): void{
        
        // 2. Connect to backend socket:
        socket = io("http://localhost:4000");
        
        //5. Listen to server messages:
        socket.on("msg-from-server", (msg: string)=>{
            console.log('We have received from server: ' + msg);
        });
    }
    
    function send(): void{
        // Send msg
        socket.emit("msg-from-client",'Test message!');
    }

    function disconnect(): void{
        // 8. Disconnect from server:
        socket.disconnect();
    }
    return (
        <div className="Home">
            <button onClick={connect}>Connect</button>
            <button onClick={disconnect}>Disconnect</button>
            <br />
            <button onClick={send}>Send</button>

        </div>
    );
}

export default Home;
