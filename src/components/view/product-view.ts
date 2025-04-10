import View from "./view";
import { Product } from "../../types";
import { CDN_URL } from "../../utils/constants";

function createProductLayout(product: Product) : string {
    return(
        `<button class="gallery__item card">
            <span class="card__category card__category_soft">${product.category}</span>
            <h2 class="card__title">${product.title}</h2>
            <img class="card__image" src="${CDN_URL}${product.image}" alt="" />
            <span class="card__price">${product.price? `${product.price} синапсов`: 'Бесплатно'}</span>
        </button>`
    );
}

export default class ProductView extends View {
    private product: Product = null;
    private onProductClick: VoidFunction = null;

    constructor(product: Product, onProductClick: VoidFunction) {
        super();
        this.product = product;
        this.onProductClick = onProductClick;

        this.element.addEventListener('click', this.productClickHandler);
    }

    get layout() : string {
        return createProductLayout(this.product);
    }

    private productClickHandler = (evt: Event) => {
        evt.preventDefault();
        this.onProductClick();
    };
}