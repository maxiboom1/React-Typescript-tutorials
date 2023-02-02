import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import notifyService from "../../../Services/NotifyService";
import productsService from "../../../Services/ProductsService";
import appConfig from "../../../Utils/AppConfig";
import Spinner from "../../SharedArea/Spinner/Spinner";
import "./ProductDetails.css";

function ProductDetails(): JSX.Element {

    // Get object containing all route params:
    const params = useParams();

    // Product state:
    const [product, setProduct] = useState<ProductModel>();

    // Navigate hook:
    const navigate = useNavigate();
    
    // Fetch product once:
    useEffect(() => {
        
        // Extract id parameter:
        const id = +params.prodId;
        
        // Get product: 
        productsService.getOneProduct(id)
            .then(responseProduct => setProduct(responseProduct))
            .catch(err => notifyService.error(err));

    }, []);

    async function deleteMe() {
        try {
            const ok = window.confirm("Are you sure?");
            if(!ok) return;
            await productsService.deleteProduct(product.id);
            notifyService.success("Product has been deleted");
            navigate("/products");
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }

    if(!product) return <Spinner />; // One liner

    return (
        <div className="ProductDetails">

			<h2>Product Details</h2>

            <h3>Name: {product?.name}</h3>
            <h3>Price: {product?.price}</h3>
            <h3>Stock: {product?.stock}</h3>
            
            <img src={appConfig.productImagesUrl + product?.imageName} />
            <br />
            <br />

            <NavLink to="/products">Back</NavLink>
            <span> | </span>
            <NavLink to={"/products/edit/" + product?.id}>Edit</NavLink>
            <span> | </span>
            <NavLink to="#" onClick={deleteMe}>Delete</NavLink>

        </div>
    );
}

export default ProductDetails;
