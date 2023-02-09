import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import notifyService from "../../../Services/NotifyService";
import productsService from "../../../Services/ProductsService";
import Spinner from "../../SharedArea/Spinner/Spinner";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

function ProductList(): JSX.Element {

    // State for all products:
    const [products, setProducts] = useState<ProductModel[]>([]);

    // Get all products once:
    useEffect(() => {
        productsService.getAllProducts()
            .then(responseProducts => setProducts(responseProducts))
            .catch(err => notifyService.error(err));
    }, []);

    return (
        <div className="ProductList">

            <NavLink to="/products/new">➕</NavLink>

            {products.length === 0 && <Spinner />}

            {products.map(p => <ProductCard key={p.id} product={p} />)}

        </div>
    );
}

export default ProductList;
