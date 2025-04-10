import View from "./view";

type ModalActions = {
    buttonText: string;
    buttonClass: string;
    spanClass: string;
    disabled: boolean;
    spanText?: string;
}

function createModalActionsLayout(action: ModalActions) {
    return(
        `<div class="modal__actions">
			<button type="submit" class="button ${action.buttonClass}" ${action.disabled? 'disabled': ''}>
                ${action.buttonText}
            </button>
			<span class="${action.spanClass}">${action.spanText || ''}</span>
		</div>`
    )
}

export default class ModalActionsView extends View {
    private action: ModalActions = null;
    private submit: VoidFunction = null;
    submitButton: Element = null;

    constructor(action: ModalActions, submit: VoidFunction) {
        super()
        this.action = action;
        this.submit = submit;

        this.submitButton = this.element.querySelector('button');

        this.submitButton.addEventListener('click', this.submitHandler);
    }

    get layout(): string {
        return createModalActionsLayout(this.action);
    }

    private submitHandler = (evt: Event) => {
        evt.preventDefault();
        this.submit();
    }
}
