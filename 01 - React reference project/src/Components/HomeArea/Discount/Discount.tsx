import "./Discount.css";

function Discount(): JSX.Element {

    const percent = 10; // Demo for getting percent from backend.

    return (
        <div className="Discount Box">
			<span>Only now - {percent}% discount on all products!</span>
        </div>
    );
}

export default Discount;
