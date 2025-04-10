import { CallbackView } from "../../types";
import View from "./view";

type OrderField = {
    title: string,
    name: string,
    type: string,
    placeholder: string,
};

function createOrderFieldLayout(field: OrderField) : string {
    return(
        `<label class="order__field">
			<span class="form__label modal__title">${field.title}</span>
			<input name="${field.name}" class="form__input" type="${field.type}" placeholder="${field.placeholder}" />
		</label>`
    );
}

export default class OrderFieldView extends View {
    private orderField: OrderField = null;
    private onFieldChange: CallbackView = null;

    constructor(orderField: OrderField, onFieldChange: CallbackView) {
        super();
        this.orderField = orderField;
        this.onFieldChange = onFieldChange;

        this.element.querySelector('input')
            .addEventListener('change', this.fieldChangeHandler);
    }

    get layout() : string {
        return createOrderFieldLayout(this.orderField);
    }

    private fieldChangeHandler = (evt: Event) => {
        evt.preventDefault();
        this.onFieldChange(evt.target);
    }
}