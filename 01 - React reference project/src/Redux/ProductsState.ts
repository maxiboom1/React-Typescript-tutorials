import { createStore } from "redux";
import ProductModel from "../Models/ProductModel";

// 1. Products State - The application level state regarding products: 
export class ProductsState {
    public products: ProductModel[] = [];
}

// 2. Products Action Type - Which actions we can perform on our products global state
export enum ProductsActionType {
    FetchProducts,
    AddProduct,
    UpdateProduct,
    DeleteProduct
}

// 3. Products Action - Interface describing an object for performing one action on our products global state:
export interface ProductsAction {
    type: ProductsActionType; // Which operation we're going to perform.
    payload: any; // What is the data related to that operation.
}

// 4. Products Reducer - The main function performing the needed action.
export function productsReducer(currentState = new ProductsState(), action: ProductsAction): ProductsState {

    // Duplicate current state into a new state:
    const newState = { ...currentState };

    // Perform the needed action on the newState:
    switch (action.type) {

        case ProductsActionType.FetchProducts: // Here, the payload is all products for saving
            newState.products = action.payload;
            break;

        case ProductsActionType.AddProduct: // Here, the payload is a product object for adding
            newState.products.push(action.payload);
            break;

        case ProductsActionType.UpdateProduct: // Here, the payload is a product object for updating
            const indexToUpdate = newState.products.findIndex(p => p.id === action.payload.id);
            if (indexToUpdate >= 0) {
                newState.products[indexToUpdate] = action.payload;
            }
            break;

        case ProductsActionType.DeleteProduct: // Here, the payload is the product id for deleting
            const indexToDelete = newState.products.findIndex(p => p.id === action.payload)
            if (indexToDelete >= 0) {
                newState.products.splice(indexToDelete, 1);
            }
            break;
    }

    // Return the newState: 
    return newState;
}

// 5. Products Store - The manager object handling redux:
export const productsStore = createStore(productsReducer);
