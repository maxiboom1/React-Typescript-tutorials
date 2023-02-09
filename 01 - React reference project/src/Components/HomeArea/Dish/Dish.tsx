import "./Dish.css";
import imageSource from "../../../Assets/Images/first-dish.jpg";

function Dish(): JSX.Element {
    return (
        <div className="Dish Box">
            <img src={imageSource} />
        </div>
    );
}

export default Dish;
