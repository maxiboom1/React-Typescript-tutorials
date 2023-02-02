import { useState } from "react";
import "./BestSeller.css";

function BestSeller(): JSX.Element {

    // Long Syntax (Nobody uses it):
    const sellerNameArr = useState<string>("");
    const sellerName = sellerNameArr[0]; // First item in the array is the state variable we need.
    const setSellerName = sellerNameArr[1]; // Second item in the array is a function for changing the variable.

    // Short Syntax - Array Destructuring Assignment:
    const [sellerItems, setSellerItems] = useState<number>(0);

    function show(): void {
        setSellerName("Exotic Liquids");
        setSellerItems(57);
    }

    return (
        <div className="BestSeller Box">
            <button onClick={show}>Best Seller</button>
			<span>Seller: {sellerName}, Total Items: {sellerItems}</span>
        </div>
    );
}

export default BestSeller;
