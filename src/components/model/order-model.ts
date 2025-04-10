import { IOrderModel, Order, IOrderApi, OrderResponse} from "../../types";

export default class OrderModel implements IOrderModel{
    order: Order;
    orderApi: IOrderApi = null;

    constructor(orderApi: IOrderApi) {
        this.orderApi = orderApi;
    }

    async submit(): Promise<OrderResponse> {
        try {
            return this.orderApi.submit(this.order);
        } catch(err) {
            throw new Error('Can\'t add order');
        }
    }

    reset(): void {
        this.order = null;
    }
}