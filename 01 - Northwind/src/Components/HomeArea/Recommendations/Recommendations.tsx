import { SyntheticEvent } from "react";
import notifyService from "../../../Services/NotifyService";
import "./Recommendations.css";

function Recommendations(): JSX.Element {

    // No arguments:
    function first(): void {
        notifyService.success("Irish Coffee");
    }

    // SyntheticEvent argument (or derivation):
    function second(args: SyntheticEvent): void {
        console.log(args);
        notifyService.success("Yogurt Ice Cream");
    }

    // Getting my own arguments:
    function third(item: string, price: number): void {
        notifyService.success("Item: " + item + ", price: " + price);
    }

    return (
        <div className="Recommendations Box">

            <span>Recommendations: </span>

			<button onClick={first}>First</button>

			<button onClick={second}>Second</button>

			<button onClick={() => third("Apple Pie", 12)}>Third</button>

        </div>
    );
}

export default Recommendations;
