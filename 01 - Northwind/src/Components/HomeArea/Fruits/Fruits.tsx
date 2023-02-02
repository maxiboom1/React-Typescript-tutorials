import "./Fruits.css";
import ananasSource from "../../../Assets/Images/ananas.jpg";
import coconatSource from "../../../Assets/Images/coconat.jpg";
import kiwiSource from "../../../Assets/Images/kiwi.jpg";

function Fruits(): JSX.Element {

    const imageSources = [ananasSource, coconatSource, kiwiSource];
    const randomIndex = Math.floor(Math.random() * imageSources.length);
    const imageSource = imageSources[randomIndex];
    
    return (
        <div className="Fruits Box">
			<img src={imageSource} />
        </div>
    );
}

export default Fruits;
