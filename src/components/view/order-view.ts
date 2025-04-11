import View from "./view";

type OrderName = 'order' | 'contacts';

function createOrderLayout(name: OrderName) : string {
    return(
        `<form class="form" name="${name}">
			<div class="order">
			</div>
		</form>`
    );
}

export default class OrderView extends View {
    private name: OrderName = null;
    contentContainer: Element = null;

    constructor(name: OrderName) {
        super();
        this.name = name;
        this.contentContainer = this.element.querySelector('.order');
    }

    get layout() : string {
        return createOrderLayout(this.name);
    }
}