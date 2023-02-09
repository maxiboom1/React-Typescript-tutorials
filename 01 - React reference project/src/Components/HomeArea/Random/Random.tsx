import { useEffect, useState } from "react";
import "./Random.css";

function Random(): JSX.Element {

    const [num, setNum] = useState<number>(0);

    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        setNum(randomNumber);
        document.title = "Num: " + randomNumber;
    }, []);

    return (
        <div className="Random Box">
            <span>Num: {num}</span>
        </div>
    );
}

export default Random;
