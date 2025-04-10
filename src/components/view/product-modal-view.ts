import View from "./view";
import { CDN_URL } from "../../utils/constants";
import { Product } from "../../types";

function createProductLayout(product: Product) : string {
    return(
        `<div class="card card_full">
			<img class="card__image" src="${CDN_URL}${product.image}" alt="" />
			<div class="card__column">
				<span class="card__category card__category_other">${product.category}</span>
				<h2 class="card__title">${product.title}</h2>
				<p class="card__text">${product.description}</p>
				<div class="card__row">
					
					<span class="card__price">${product.price? `${product.price} синапсов`: 'Бесплатно'}</span>
				</div>
			</div>
		</div>`
    );
}

export default class ProductModalView extends View {
    private product: Product = null;

    constructor(product: Product) {
        super();
        this.product = product;
    }

    get layout(): string {
        return createProductLayout(this.product);
    }
}