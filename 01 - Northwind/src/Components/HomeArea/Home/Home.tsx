import BestSeller from "../BestSeller/BestSeller";
import Clock from "../Clock/Clock";
import ClockEx from "../ClockEx/ClockEx";
import Desserts from "../Desserts/Desserts";
import Discount from "../Discount/Discount";
import Dish from "../Dish/Dish";
import Fruits from "../Fruits/Fruits";
import Random from "../Random/Random";
import Recommendations from "../Recommendations/Recommendations";
import Sale from "../Sale/Sale";
import Specials from "../Specials/Specials";
import "./Home.css";

function Home(): JSX.Element {
    return (
        <div className="Home">

            {/* Interpolation: */}
			<Discount />

            {/* Conditional Rendering: */}
            <Specials />

            {/* Displaying Lists: */}
            <Desserts />

            {/* Events: */}
            <Recommendations />

            {/* Display Images: */}
            <Dish />

            {/* Random Image: */}
            <Fruits />

            {/* Props: */}
            <Sale discount={10} category="Beverages" />
            <Sale discount={15} category="Candies" />

            {/* State: */}
            <BestSeller />

            {/* useEffect: */}
            <Clock />
            <Random />

            {/* Class Component: */}
            <ClockEx format="24h" />
            
        </div>
    );
}

export default Home;
