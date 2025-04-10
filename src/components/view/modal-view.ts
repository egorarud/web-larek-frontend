import View from "./view";

function createModalLayout() : string {
    return(
        `<div class="modal">
            <div class="modal__container">
                <button class="modal__close" aria-label="закрыть"></button>
                <div class="modal__content">
                
                </div>
            </div>
	    </div>`
    );
}

export default class ModalView extends View {
    private content: Element = null;
    private onModalCloseClick: VoidFunction = null;

    constructor(onModalCloseClick: VoidFunction) {
        super();
        this.onModalCloseClick = onModalCloseClick;

        this.element.querySelector('.modal__close')
            .addEventListener('click', this.modalCloseClickHandler);
    }

    get layout() : string {
        return createModalLayout();
    }

    private modalCloseClickHandler = (evt: Event) => {
        evt.preventDefault();
        this.content = null;
        this.onModalCloseClick();
    }
}