import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import notifyService from "../../../Services/NotifyService";
import productsService from "../../../Services/ProductsService";
import appConfig from "../../../Utils/AppConfig";
import "./EditProduct.css";

function EditProduct(): JSX.Element {

    const params = useParams();
    const { register, handleSubmit, setValue } = useForm<ProductModel>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<ProductModel>();

    // Get product to edit:
    useEffect(() => {
        const id = +params.prodId;
        productsService.getOneProduct(id)
            .then(responseProduct => {
                setValue("id", responseProduct.id);
                setValue("name", responseProduct.name);
                setValue("price", responseProduct.price);
                setValue("stock", responseProduct.stock);
                setProduct(responseProduct);
            })
            .catch(err => notifyService.error(err));
    }, []);

    async function send(product: ProductModel) {
        try {
            product.image = (product.image as unknown as FileList)[0];
            await productsService.editProduct(product);
            notifyService.success("Product has been updated");
            navigate("/products");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="EditProduct Box">

            <h2>Edit Product</h2>

            <form onSubmit={handleSubmit(send)}>

                <input type="hidden" {...register("id")} />

                <label>Name:</label>
                <input type="text" {...register("name")} required minLength={2} maxLength={100} />

                <label>Price:</label>
                <input type="number" {...register("price")} required min={0} max={1000} />

                <label>Stock:</label>
                <input type="number" {...register("stock")} required min={0} max={1000} />

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} />

                <img src={appConfig.productImagesUrl + product?.imageName} />

                <button>Update</button>

            </form>

        </div>
    );
}

export default EditProduct;
