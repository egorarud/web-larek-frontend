import { IBasketModel, ID } from "../../types";

export default class BasketModel implements IBasketModel {
    _products : ID[] = [];
    cost = 0;

    get products() {
        return this._products;
    }

    add(id: ID) : void {
        this._products.push(id);
    }

    remove(id: ID) : void {
        this._products.splice(this._products.indexOf(id), 1);
    }

    getProductsCount(): number {
        return this._products.length;
    }

    reset(): void {
        this._products = [];
        this.cost = 0;
    }
}