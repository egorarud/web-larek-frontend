import View from "./view";

function createSuccessLayout(cost: number) : string {
    return(
        `<div class="order-success">
            <h2 class="order-success__title">Заказ оформлен</h2>
            <p class="order-success__description">Списано ${cost} синапсов</p>
            <button class="button order-success__close">За новыми покупками!</button>
        </div>`
    );
}

export default class SuccessView extends View {
    private cost: number = null;

    constructor(cost: number) {
        super();
        this.cost = cost;
    }

    get layout() : string {
        return createSuccessLayout(this.cost);
    }
}