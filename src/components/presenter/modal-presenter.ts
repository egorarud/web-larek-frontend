import ModalView from "../view/modal-view";
import View from "../view/view";
import { render, replace } from "../../utils/utils";

export default class ModalPresenter {
    private modalContainer: Element = null;
    private modalWrapper: Element = null;
    private modalContent: View = null;
    private modalContentContainer: Element = null;

    constructor(modalContainer: Element) {
        this.modalContainer = modalContainer;
    }

    init() {
        this.renderModal();
        this.modalWrapper = document.querySelector('.modal');
        this.modalContentContainer = document.querySelector('.modal__content');
    }

    private renderModal() {
        const modalComponent = new ModalView(this.onModalCloseClick);
        render(modalComponent, this.modalContainer);
    }

    private onModalCloseClick = () => {
        console.log('close');
        this.modalWrapper.classList.remove('modal_active');
    }
    
    open = (element: View) => {
        if (this.modalContent) {
            replace(element, this.modalContent);
        }

        this.modalContent = element;
        render(this.modalContent, this.modalContentContainer);
        this.modalWrapper.classList.add('modal_active');
    }
}