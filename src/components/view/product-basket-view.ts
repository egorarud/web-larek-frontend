import View from "./view";
import { Product } from "../../types";

function createProductLayout(product: Product, index: number) : string {
    return(
        `<li class="basket__item card card_compact">
			<span class="basket__item-index">${index}</span>
			<span class="card__title">${product.title}</span>
			<span class="card__price">${product.price? `${product.price} синапсов`: 'Бесплатно'}</span>
			<button class="basket__item-delete card__button" aria-label="удалить"></button>
		</li>`
    );
}

export default class ProductBasketView extends View {
    private product: Product = null;
    private onDeleteButtonClick: (product: Product) => void = null;
    private index: number = null;

    constructor(product: Product, index: number, onDeleteButtonClick: (product: Product) => void) {
        super();
        this.product = product;
        this.onDeleteButtonClick = onDeleteButtonClick;
        this.index = index;

        const elem = this.element.querySelector('.basket__item-delete');
        console.log(elem);
        elem.addEventListener('click', this.deleteButtonClickHandler);
    }

    get layout(): string {
        return createProductLayout(this.product, this.index);
    }

    private deleteButtonClickHandler = (evt: Event) => {
        evt.preventDefault();
        console.log('delete');
        this.onDeleteButtonClick(this.product);
    }
}