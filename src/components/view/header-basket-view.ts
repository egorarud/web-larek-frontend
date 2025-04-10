import View from "./view";

function createLayout(count: number) : string {
    return(
        `<button class="header__basket">
			<span class="header__basket-counter">${count}</span>
		</button>`
    );
}

export default class HeaderBasketView extends View {
    private onBasketClick: VoidFunction = null;
    private count = 0;

    constructor(onBasketClick: VoidFunction, count = 0) {
        super();
        this.onBasketClick = onBasketClick;
        this.count = count;

        this.element.addEventListener('click', this.basketClickHandler);
    }

    get layout() : string {
        return createLayout(this.count);
    }

    private basketClickHandler = (evt: Event) => {
        evt.preventDefault();
        this.onBasketClick();
    };
}