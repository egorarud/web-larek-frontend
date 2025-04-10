import { CallbackView } from "../../types";
import View from "./view";

function createOrderLayout() : string {
    return(
        `<div class="order__field">
            <h2 class="modal__title">Способ оплаты</h2>
            <div class="order__buttons">
                <button name="card" type="button" class="button button_alt">Онлайн</button>
                <button name="cash" type="button" class="button button_alt">При получении</button>
            </div>
        </div>`
    );
}

export default class OrderPaymentView extends View {
    private onButtonClick: CallbackView = null;

    constructor(onButtonClick: CallbackView) {
        super();
        this.onButtonClick = onButtonClick;

        this.element.querySelectorAll('.button_alt')
            .forEach(elem => elem.addEventListener('click', this.buttonClickHandler));

    }

    get layout() : string {
        return createOrderLayout();
    }

    private buttonClickHandler = (evt: Event) => {
        evt.preventDefault();
        this.onButtonClick(evt.target);
    }
}