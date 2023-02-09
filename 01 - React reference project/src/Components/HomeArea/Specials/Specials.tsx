import "./Specials.css";

function Specials(): JSX.Element {

    function isWeekend(): boolean {
        const now = new Date();
        const day = now.getDay() + 1; // 1 = Sunday, 2 = Monday, ... 
        return day >= 6;
    }

    return (
        <div className="Specials Box">

            {/* Ternary Operator: */}
			{ isWeekend() ? <span>Pizza 🍕 </span> : <span>Pasta 🍝 </span> }

            {/* Short Circuit: */}
            { isWeekend() && <span>Fish & Chips 🍟 </span> }
            
        </div>
    );
}

export default Specials;
