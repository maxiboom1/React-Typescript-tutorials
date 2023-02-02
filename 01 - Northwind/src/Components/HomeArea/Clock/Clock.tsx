import { useEffect, useState } from "react";
import "./Clock.css";

function Clock(): JSX.Element {

    const [time, setTime] = useState<string>("test");

    useEffect(() => {

        // Create timer once when component created:
        const timerId = window.setInterval(() => {
            const now = new Date();
            const currentTime = now.toLocaleTimeString();
            setTime(currentTime);
            console.log("Test");
        }, 1000);

        // Invoke function when component destroyed:
        return () => {
            window.clearInterval(timerId);
        };

    }, []); // [] → tells react to call our callback once - when component created.

    return (
        <div className="Clock Box">
            <span>{time}</span>
        </div>
    );
}

export default Clock;
