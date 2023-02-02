class ProductModel {
    public id: number;
    public name: string;
    public price: number;
    public stock: number;
    public imageName: string; // Image name given from server.
    public image: File; // Image file to upload.
}

export default ProductModel;
