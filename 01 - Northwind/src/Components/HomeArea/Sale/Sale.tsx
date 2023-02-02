import "./Sale.css";

// type SaleProps = {
//     discount: number;
//     category: string;
// }

interface SaleProps {
    discount: number;
    category: string;
}

function Sale(props: SaleProps): JSX.Element {
    return (
        <div className="Sale Box">
			<span>{props.discount}% discount on all {props.category}</span>
        </div>
    );
}

export default Sale;
