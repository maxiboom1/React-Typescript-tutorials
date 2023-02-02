import axios from "axios";
import ProductModel from "../Models/ProductModel";
import { ProductsActionType, productsStore } from "../Redux/ProductsState";
import appConfig from "../Utils/AppConfig";

class ProductsService {

    // Get all products: 
    public async getAllProducts(): Promise<ProductModel[]> {

        // Take products from global state:
        let products = productsStore.getState().products;

        // If we don't have products - get them from backend:
        if (products.length === 0) {

            // Get from REST API products: 
            const response = await axios.get<ProductModel[]>(appConfig.productsUrl);

            // Extract products: 
            products = response.data; // data will be ProductModel[]

            // Update global store: 
            productsStore.dispatch({ type: ProductsActionType.FetchProducts, payload: products });
        }

        // Return:
        return products;
    }

    // Get one product: 
    public async getOneProduct(id: number): Promise<ProductModel> {

        // Take products from global state:
        let products = productsStore.getState().products;

        // Find the needed product: 
        let product = products.find(p => p.id === id);

        // If product doesn't exist - get it from backend:
        if (!product) {

            // Get product from REST API:
            const response = await axios.get<ProductModel>(appConfig.productsUrl + id);

            // Extract product:
            product = response.data;

            // No need to update global state
        }

        // Return:
        return product;
    }

    // Add product:
    public async addProduct(product: ProductModel): Promise<void> {

        // Create header for sending image inside the body:
        const headers = { "Content-Type": "multipart/form-data" };

        // Send product to server:
        const response = await axios.post<ProductModel>(appConfig.productsUrl, product, { headers });

        // Get the added product:
        const addedProduct = response.data;

        // Add that addedProduct also to the global state: 
        productsStore.dispatch({ type: ProductsActionType.AddProduct, payload: addedProduct });
    }

    // Edit product:
    public async editProduct(product: ProductModel): Promise<void> {

        // Create header for sending image inside the body:
        const headers = { "Content-Type": "multipart/form-data" }

        // Send product to server:
        const response = await axios.put<ProductModel>(appConfig.productsUrl + product.id, product, { headers });

        // Get the updated product:
        const updatedProduct = response.data;

        // Update global store with the updatedProduct: 
        productsStore.dispatch({ type: ProductsActionType.UpdateProduct, payload: updatedProduct });
    }

    // Delete product: 
    public async deleteProduct(id: number): Promise<void> {

        // Delete product on server:
        await axios.delete(appConfig.productsUrl + id);

        // Delete that product form our global store: 
        productsStore.dispatch({ type: ProductsActionType.DeleteProduct, payload: id });
    }

}

const productsService = new ProductsService(); // Singleton

export default productsService;
