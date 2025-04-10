import { IView } from "../../types";
import { createElement } from "../../utils/utils";

export default abstract class View implements IView {
    _element: Element = null;
    
    constructor() {
        if (new.target === View) {
            throw new Error('Can\'t instantiate View, only concrete one.');
        }
    }

    get element(): Element{
        if (!this._element) {
            this._element = createElement('div', this.layout).firstElementChild;
        }
    
        return this._element;
    }

    get layout() : string{
        throw new Error('Abstract method not implemented: get template');
    }

    remove() : void {
        this._element = null;
    }
}
