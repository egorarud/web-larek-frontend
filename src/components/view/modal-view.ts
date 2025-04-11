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
    private onModalCloseClick: VoidFunction = null;

    constructor(onModalCloseClick: VoidFunction) {
        super();
        this.onModalCloseClick = onModalCloseClick;

        this.element.querySelector('.modal__close')
            .addEventListener('click', this.modalCloseClickHandler);

        this.element.addEventListener('click', this.overlayClickHandler);
    }

    get layout() : string {
        return createModalLayout();
    }

    private modalCloseClickHandler = (evt: Event) => {
        evt.preventDefault();
        this.onModalCloseClick();
    }

    private overlayClickHandler = (evt: Event) => {
        evt.preventDefault();
        if (evt.target === this.element) {
            this.onModalCloseClick();
        }
    }
}