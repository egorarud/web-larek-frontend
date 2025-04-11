import HeaderBasketView from "../view/header-basket-view";
import BasketModel from "../model/basket-model";
import BasketView from "../view/basket-view";
import ModalActionsView from "../view/modal-actions-view";
import ProductBasketView from "../view/product-basket-view";
import { render, replace } from "../../utils/utils";
import ModalPresenter from "./modal-presenter";
import { IEvents } from "../base/events";
import { IProductsModel, Product } from "../../types";
import OrderPresenter from "./order-presenter";

export default class BasketPresenter {
    private basketModel: BasketModel = null;
    private modalPresenter: ModalPresenter = null;
    private basketHeaderContainer: Element = null;
    private productsModel: IProductsModel = null;
    private emitter: IEvents = null;
    private basketHeaderComponent: HeaderBasketView = null;
    private cost = 0;

    constructor(
        basketModel: BasketModel, 
        basketHeaderContainer: Element, 
        modalPresenter: ModalPresenter, 
        productsModel: IProductsModel, 
        emitter: IEvents
    ) {
        this.basketModel = basketModel;
        this.basketHeaderContainer = basketHeaderContainer;
        this.modalPresenter = modalPresenter;
        this.productsModel = productsModel;
        this.emitter = emitter;

        this.emitter.on('addProduct', () => this.renderBasketHeader());
        this.emitter.on('success', () => this.renderBasketHeader());
    }

    init() {
        this.renderBasketHeader();
    }

    private renderBasketHeader() {
        const basketHeaderComponent = new HeaderBasketView(this.basketClickHandler, this.basketModel.getProductsCount());
        if (this.basketHeaderComponent) {
            replace(basketHeaderComponent, this.basketHeaderComponent);
        }
        
        this.basketHeaderComponent = basketHeaderComponent;
        render(this.basketHeaderComponent, this.basketHeaderContainer);
    }

    private renderBasket() {
        const basketProduct = this.productsModel.products.filter((product) => this.basketModel.products.includes(product.id));
        this.cost = 0;
        basketProduct.forEach(product => this.cost += product.price)

        const basketComponent = new BasketView();
        const modalActionsComponent = new ModalActionsView({
            buttonText: 'Оформить', 
            buttonClass: 'basket__button',
            spanClass: 'basket__price',
            disabled: basketProduct.length == 0,
            spanText: `${this.cost} синапсов`
        }, this.submitBasketHandler);

        this.modalPresenter.open(basketComponent);
        render(modalActionsComponent, basketComponent.element);
        basketProduct.forEach((product, index) => render(new ProductBasketView(product, index + 1, this.deleteProductHandler), basketComponent.productContainer));
    }

    private basketClickHandler = () => {
        this.renderBasket();
    }

    private deleteProductHandler = (product: Product) => {
        this.basketModel.remove(product.id);
        this.renderBasketHeader();
        this.renderBasket();
        this.emitter.emit('productDelete', product);
    }

    private submitBasketHandler = () => {
        const orderComponent = new OrderPresenter(this.modalPresenter, this.basketModel, this.emitter);
        orderComponent.init();
        this.basketModel.cost = this.cost;
    }
}