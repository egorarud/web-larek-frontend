import { IBasketModel, IProductsModel } from "../../types";
import ProductPresenter from "./product-presenter";
import { IEvents } from "../base/events";
import ModalPresenter from "./modal-presenter";

export default class ProductCatalogPresenter {
    private productsModal: IProductsModel = null;
    private productsContainer: Element = null;
    private modalPresenter: ModalPresenter = null;
    private basketModel: IBasketModel = null;
    private emitter: IEvents = null;

    constructor(
        ProductsModal: IProductsModel, 
        productsContainer: Element,
        modalPresenter: ModalPresenter, 
        basketModel: IBasketModel, 
        emitter: IEvents
    ) {
        this.productsModal = ProductsModal;
        this.productsContainer = productsContainer;
        this.modalPresenter = modalPresenter;
        this.basketModel = basketModel;
        this.emitter = emitter;
    }

    get products() {
        return this.productsModal.products;
    }

    init() {
        this.renderProducts();
    }

    private renderProducts() {
        const products = this.products;
        console.log(products)
        for (const i in products) {
            const productPresenter = new ProductPresenter(products[i], this.productsContainer, this.modalPresenter, this.basketModel, this.emitter);
            productPresenter.init();
        }
    }
}