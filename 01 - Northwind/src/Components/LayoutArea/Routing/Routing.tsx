import { Navigate, Route, Routes } from "react-router-dom";
import About from "../../AboutArea/About/About";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";
import AddProduct from "../../ProductsArea/AddProduct/AddProduct";
import EditProduct from "../../ProductsArea/EditProduct/EditProduct";
import ProductDetails from "../../ProductsArea/ProductDetails/ProductDetails";
import ProductList from "../../ProductsArea/ProductList/ProductList";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {
    return (
        <Routes>

            {/* Register: */}
            <Route path="/register" element={<Register />} />

            {/* Login: */}
            <Route path="/login" element={<Login />} />

            {/* Home Page: */}
            <Route path="/home" element={<Home />} />

            {/* Products Page: */}
            <Route path="/products" element={<ProductList />} />

            {/* Product Details Page: */}
            <Route path="/products/details/:prodId" element={<ProductDetails />} />

            {/* Add Product Page: */}
            <Route path="/products/new" element={<AddProduct />} />

            {/* Edit Product Page: */}
            <Route path="/products/edit/:prodId" element={<EditProduct />} />

            {/* About Page: */}
            <Route path="/about" element={<About />} />

            {/* Default Route: */}
            <Route path="/" element={<Navigate to="/home" />} />

            {/* Page not found: */}
            <Route path="*" element={<PageNotFound />} />

        </Routes>
    );
}

export default Routing;
