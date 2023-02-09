import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import notifyService from "../../../Services/NotifyService";
import productsService from "../../../Services/ProductsService";
import TotalProducts from "../TotalProducts/TotalProducts";
import "./AddProduct.css";

function AddProduct(): JSX.Element {

    const { register, handleSubmit } = useForm<ProductModel>();

    const navigate = useNavigate();

    async function send(product: ProductModel) {
        try {
            product.image = (product.image as unknown as FileList)[0];
            await productsService.addProduct(product);
            notifyService.success("Product has been added");
            navigate("/products");
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="AddProduct Box">

            <h2>Add Product</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Name:</label>
                <input type="text" {...register("name")} required minLength={2} maxLength={100} />

                <label>Price:</label>
                <input type="number" {...register("price")} required min={0} max={1000} />

                <label>Stock:</label>
                <input type="number" {...register("stock")} required min={0} max={1000} />

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} />

                <button>Add</button>

            </form>

        </div>
    );
}

export default AddProduct;
