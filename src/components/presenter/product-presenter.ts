import ProductView from "../view/product-view";
import ProductModalView from "../view/product-modal-view";
import ProductButtonView from "../view/button-product-view";
import ModalPresenter from "./modal-presenter";
import { render, replace } from "../../utils/utils";
import { IBasketModel, Product } from "../../types";
import View from "../view/view";
import { IEvents } from "../base/events";

export default class ProductPresenter {
    private productContainer: Element = null;
    private product: Product = null;
    private modalPresenter: ModalPresenter = null;
    private productComponent: View = null;
    private productModalComponent: View = null;
    private buttonComponent: View = null;
    private basketModel: IBasketModel = null;
    private emitter: IEvents = null;

    private inBasket = false;

    constructor(
        product: Product, 
        productContainer: Element, 
        modalPresenter: ModalPresenter, 
        basketModel: IBasketModel, 
        emitter: IEvents
    ) {
        this.product = product;
        this.productContainer = productContainer;
        this.modalPresenter = modalPresenter;
        this.basketModel = basketModel;
        this.emitter = emitter;

        this.emitter.on('productDelete', (product: Product) => {
            if (this.product.id == product.id) {
                this.inBasket = false;
                this.renderButton();
            }
        })
    }

    init() {
        this.renderProduct();
    }

    private addProductInBasket = () => {
        this.basketModel.add(this.product.id);
        this.inBasket = true;
        this.emitter.emit('addProduct');
        this.renderButton();
    }

    private renderProduct() {
        this.productComponent = new ProductView(this.product, this.onProductClick);
        render(this.productComponent, this.productContainer);
    }

    private renderButton() {
        if (!this.product.price) {
            return;
        }
        
        const buttonComponent = new ProductButtonView(this.inBasket, this.addProductInBasket);
        if (this.buttonComponent) {
            replace(buttonComponent, this.buttonComponent);
        }
        
        this.buttonComponent = buttonComponent;
        render(this.buttonComponent, this.productModalComponent.element.querySelector('.card__row'), 'afterbegin');
    }

    private onProductClick = () => {
        this.productModalComponent = new ProductModalView(this.product);
        this.modalPresenter.open(this.productModalComponent);
        this.renderButton();
    }
}