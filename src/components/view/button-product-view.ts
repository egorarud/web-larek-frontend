import View from "./view";

function createButtonLayout(inBasket: boolean) : string {
    return(
        `<button class="button" ${inBasket? 'disabled': ''}>${inBasket? 'В корзине': 'В корзину'}</button>`
    );
}

export default class ProductButtonView extends View {
    private inBasket: boolean = null;
    private onButtonClick: VoidFunction = null;

    constructor(inBasket: boolean, onButtonClick: VoidFunction) {
        super();
        this.inBasket = inBasket;
        this.onButtonClick = onButtonClick;

        this.element.addEventListener('click', this.buttonClickHandler);
    }

    get layout(): string {
        return createButtonLayout(this.inBasket);
    }

    private buttonClickHandler = (evt: Event) => {
        evt.preventDefault();
        this.onButtonClick();
    }
}