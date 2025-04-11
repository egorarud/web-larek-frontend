
import View from "./view";

function createBasketLayout() : string {
    return(
        `<div class="basket">
			<h2 class="modal__title">Корзина</h2>
			<ul class="basket__list">
            </ul>
		</div>`
    );
}

export default class BasketView extends View {
    productContainer: Element = null;

    constructor() {
        super();

        this.productContainer = this.element.querySelector('.basket__list')
    }

    get layout(): string {
        return createBasketLayout();
    }
}