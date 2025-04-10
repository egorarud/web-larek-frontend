export type ID = string;

// товар
export type Product = {
    id: ID;                 // уникальный идентефикатор товара
    title: string;          // название товара
    description: string;    // описание товара
    image: string;          // ссылка на изображение товара
    category: string;       // категория товара
    price: number | null;   // стоимость товара
}

// список товаров
export type ProductList = {
    total: number;             // количество товаров в списке
    items: Product[]           // товары
}

// заказ
export type Order = {
    payment: string;            // тип оплаты
    address: string;            // адрес доставки
    phone: string;              // номер телефона пользователя
    email: string;              // email пользователя
    total: number;              // общая сумма заказа
    items: ID[];                // массив идентификаторов товаров
}

// ответ на заказ
export type OrderResponse = {
    id: ID;                     // идентификатор заказа
    total: number;              // сумма заказ
}

export interface IProductsModel {
    products: Product[] | null;      
    api: IProductsApi;
    setProducts(): void;            // async метод для получения списка Product[]
    getProduct(id: ID): Product;    // получения Product по id
}

export interface IProductsApi {
    get products(): Promise<ProductList>; // async, отправляет GET запрос на получение Product
}

export interface IBasketModel {
    products: ID[]; 
    cost: number;
    add(id: ID): void;              // добавление товара в корзину
    remove(id: ID): void;           // удаление товара из корзины
    reset(): void;
}

export interface IOrderModel {
    order: Order | null;
    orderApi: IOrderApi;
    submit(): Promise<OrderResponse>;        // async метод для отправки формы Order
    reset(): void;                  // сброс формы Order
}

export interface IOrderApi {
    submit(order: Order): Promise<OrderResponse>;      // async, отправляет POST запрос с Order в теле запроса
}

export interface IView {
    element: Element | null;    // элемент представления
    get layout(): string;         // возвращает разметку
    remove(): void;                 // удаление элемента
}

export const RenderPosition = {
    BEFOREBEGIN: 'beforebegin',
    AFTERBEGIN: 'afterbegin',
    BEFOREEND: 'beforeend',
    AFTEREND: 'afterend',
}

export type CallbackView = (elem: EventTarget) => void;  