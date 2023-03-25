import "./Home.css";
import {Socket, io} from "socket.io-client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import MessageModel from "../../../Models/MessageModel";

let socket: Socket;


function Home(): JSX.Element {
    
    const [color,setColor] = useState<string>("#000");
    const [text,setText] = useState<string>("");
    const [nick,setNick] = useState<string>("");

    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const inputElement = useRef(null);


    useEffect(() => {inputElement.current.focus();}, [isConnected]);

      
    function connect(): void{
        
        // 2. Connect to backend socket:
        socket = io("http://localhost:4000");
        setIsConnected(true);
        
        //5. Listen to server messages:
        socket.on("msg-from-server", (msg: MessageModel)=>{
            setMessages(arr => [...arr, msg]);
        });
    }   
    
    function send(): void{
        // Send msg
        socket.emit("msg-from-client",new MessageModel(text, color, nick));
        setText("");
        console.log(nick)
        inputElement.current.focus();
    }

    function disconnect(): void{
        // 8. Disconnect from server:
        socket.disconnect();
        setIsConnected(false);
    }

    function handleText(args: ChangeEvent<HTMLInputElement>): void {
        setText(args.target.value);
    }

    function handleNick(args: ChangeEvent<HTMLInputElement>): void {
        setNick(args.target.value);
    }

    function handleEnter(e:any): void{
        if(e.code === "Enter"){
            send();
        }
    }

    function handleColor(args: ChangeEvent<HTMLInputElement>){
        setColor(args.target.value);
    }
    
    return (
        <div className="Home">
            <button onClick={connect} disabled={isConnected}>Connect</button>
            <button onClick={disconnect} disabled={!isConnected}>Disconnect</button>
            <br />
            <label>Color:</label>
            <input type="color" value={color} onChange={handleColor} />
            <br />
            
            <label>Nickname:</label>
            <input type="text" value={nick} onChange={handleNick} disabled={isConnected}/>
            
            <label>Message:</label>
            <input type="text" ref={inputElement} value={text} onChange={handleText} onKeyUp={(e)=>{handleEnter(e)}} disabled={!isConnected}/>
            <button onClick={send} disabled={!isConnected}>Send</button>

            <div className="messages">
                {messages.map((msg,index) => <p key={index} style={{color: msg.color}}>{msg.nick}: {msg.text}</p>)}
            </div>

        </div>
    );
}

export default Home;
