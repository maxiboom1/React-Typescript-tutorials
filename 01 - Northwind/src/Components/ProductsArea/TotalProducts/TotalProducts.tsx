import { useEffect, useState } from "react";
import { productsStore } from "../../../Redux/ProductsState";
import "./TotalProducts.css";

function TotalProducts(): JSX.Element {

    const [count, setCount] = useState<number>(0);

    useEffect(() => {

        // Take number of products length into count: 
        setCount(productsStore.getState().products.length);

        // Subscribe for changes (any dispatch will invoke the callback): 
        const unsubscribe = productsStore.subscribe(() => {

            // Take number of products length into count: 
            setCount(productsStore.getState().products.length);
        });

        // Stop listening when component destroyed:
        return () => unsubscribe();

    }, []);

    return (
        <div className="TotalProducts">
            {count > 0 && <span>Total Products: {count}</span>}
        </div>
    );
}

export default TotalProducts;
