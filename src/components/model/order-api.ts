import { Api } from "../base/api";
import { IOrderApi, Order, OrderResponse } from "../../types";

export default class OrderApi extends Api implements IOrderApi{
    async submit(order : Order) {
        return await this.post(
            '/order',
            order
        ).then((data: OrderResponse) => data);
    }
}
