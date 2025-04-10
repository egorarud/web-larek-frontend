import { Api } from "../base/api";
import { IProductsApi, ProductList } from "../../types";

export default class ProductsApi extends Api  implements IProductsApi{
  get products() {
    return this.get('/product').then((data : ProductList) => data);
  }
}
