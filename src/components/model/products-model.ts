import { IProductsModel, Product, IProductsApi, ID } from "../../types";

export default class ProductsModel implements IProductsModel {
    products : Product[]|null = null;
    api : IProductsApi = null;

    constructor(productsApi: IProductsApi) {
        this.api = productsApi;
    }

    async setProducts(): Promise<void> {
        try {
            this.products = (await this.api.products).items;
        } catch(err) {
            this.products = [];
        }
    }

    getProduct(id: ID): Product {
        return this.products.find((product) => product.id === id);
    }
}