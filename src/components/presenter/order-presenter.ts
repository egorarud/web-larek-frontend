import { IBasketModel, IOrderModel } from "../../types";
import { API_URL } from "../../utils/constants";
import { isInputValid, render } from "../../utils/utils";
import { IEvents } from "../base/events";
import OrderApi from "../model/order-api";
import OrderModel from "../model/order-model";
import ModalActionsView from "../view/modal-actions-view";
import OrderFieldView from "../view/order-field-view";
import OrderPaymentView from "../view/order-payment-view";
import OrderView from "../view/order-view";
import SuccessView from "../view/success-view";
import View from "../view/view";
import ModalPresenter from "./modal-presenter";

export default class OrderPresenter {
    private orderPaymentComponent: View = null;
    private orderPaymentWrapperComponent: View = null;
    private orderContactWrapperComponent: View = null;
    private orderPaymentFieldComponents: View[] = null;
    private orderContactFieldComponents: View[] = null;
    private modalActionsPayment: ModalActionsView = null;
    private modalActionsContact: ModalActionsView = null;

    private modalPresenter: ModalPresenter = null;
    private orderModel: IOrderModel = null;
    private basketModel: IBasketModel = null;

    private isPaymentSelect = false;
    private isAdressSelect = false;
    private isEmailSelect = false;
    private isPhoneSelect = false;

    private payment: Element = null;
    private adress: HTMLInputElement = null;
    private email: HTMLInputElement = null;
    private phone: HTMLInputElement = null;

    private emmiter: IEvents = null;

    constructor(modalPresenter: ModalPresenter, basketModel: IBasketModel, emmiter: IEvents) {
        this.modalPresenter = modalPresenter;
        this.basketModel = basketModel;
        this.emmiter = emmiter;

        this.orderModel = new OrderModel(new OrderApi(API_URL));
        this.orderPaymentWrapperComponent = new OrderView('order');
        this.orderContactWrapperComponent = new OrderView('contacts');
        this.orderPaymentComponent = new OrderPaymentView(this.paymentClickHandler);
        
        this.orderPaymentFieldComponents = [
            new OrderFieldView({
                title: 'Адрес доставки',
                name: 'address',
                type: 'text',
                placeholder: 'Введите адрес',
            }, this.adressChangeHandler)
        ];

        this.orderContactFieldComponents = [
            new OrderFieldView({
                title: 'Email',
                name: 'email',
                type: 'text',
                placeholder: 'Введите Email',
            }, this.emailChangeHandler),
            new OrderFieldView({
                title: 'Телефон',
                name: 'phone',
                type: 'text',
                placeholder: '+7 ',

            }, this.phoneChangeHandler)
        ];
    }

    init() {
        this.renderPaymentOrder();
    }

    private renderPaymentOrder() {
        this.modalPresenter.open(this.orderPaymentWrapperComponent);
        const container = this.orderPaymentWrapperComponent.element.querySelector('.order');

        render(this.orderPaymentComponent, container);
        this.orderPaymentFieldComponents.forEach(component => render(component, container));

        this.modalActionsPayment = new ModalActionsView({
            buttonText: 'Далее', 
            buttonClass: 'order__button',
            spanClass: 'form__errors',
            disabled: !this.isPaymentSelect && !this.isAdressSelect,
        }, () => this.renderContactOrder());

        render(this.modalActionsPayment, this.orderPaymentWrapperComponent.element)
    }

    private renderContactOrder() {
        this.modalPresenter.open(this.orderContactWrapperComponent);
        const container = this.orderContactWrapperComponent.element.querySelector('.order');

        this.orderContactFieldComponents.forEach(component => render(component, container));

        this.modalActionsContact = new ModalActionsView({
            buttonText: 'Оплатить', 
            buttonClass: '',
            spanClass: 'form__errors',
            disabled: !this.isEmailSelect && !this.isPhoneSelect,
        }, this.submitOrder);

        render(this.modalActionsContact, this.orderContactWrapperComponent.element)
    }

    private paymentClickHandler = (target: Element) => {
        if (this.payment === null) {
            this.payment = target;
            this.isPaymentSelect = true;
        }

        if (this.payment !== target) {
            this.payment.classList.remove('button_alt-active');
            this.payment = target;
        }

        this.payment.classList.add('button_alt-active');

        if (this.isAdressSelect && this.isPaymentSelect) {
            this.modalActionsPayment.submitButton.removeAttribute('disabled');
        }
    }

    private adressChangeHandler = (target: HTMLInputElement) => {
        this.isAdressSelect = isInputValid(target);
        this.adress = target;
        if (this.isAdressSelect && this.isPaymentSelect) {
            this.modalActionsPayment.submitButton.removeAttribute('disabled');
        }
    }

    private emailChangeHandler = (target: HTMLInputElement) => {
        this.isEmailSelect = isInputValid(target);
        this.email = target;
        if (this.isEmailSelect && this.isPhoneSelect) {
            this.modalActionsContact.submitButton.removeAttribute('disabled');
        }
    }

    private phoneChangeHandler = (target: HTMLInputElement) => {
        this.isPhoneSelect = isInputValid(target);
        this.phone = target;
        if (this.isEmailSelect && this.isPhoneSelect) {
            this.modalActionsContact.submitButton.removeAttribute('disabled');
        }
    }

    private submitOrder = () => {
        this.orderModel.order = {
            payment: this.payment.getAttribute('value'),
            address: this.adress.getAttribute('value'),
            phone: this.phone.getAttribute('value'),
            email: this.email.getAttribute('value'),
            total: this.basketModel.cost,
            items: this.basketModel.products
        };

        console.log(this.orderModel.submit());
        this.modalPresenter.open(new SuccessView(this.basketModel.cost));
        this.basketModel.reset();
        this.emmiter.emit('success');
    }
}