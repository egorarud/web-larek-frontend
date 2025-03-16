type ID = string;

// товар
type Product = {
    id: ID;                 // уникальный идентефикатор товара
    title: string;          // название товара
    description: string;    // описание товара
    image: string;          // ссылка на изображение товара
    category: string;       // категория товара
    price: number | null;   // стоимость товара
}

// список товаров
type ProductList = {
    total: number;             // количество товаров в списке
    items: Product[]           // товары
}

// заказ
type Order = {
    payment: string;            // тип оплаты
    address: string;            // адрес доставки
    phone: string;              // номер телефона пользователя
    email: string;              // email пользователя
    total: number;              // общая сумма заказа
    items: ID[];                // массив идентификаторов товаров
}

// ответ на заказ
type OrderResponse = {
    id: ID;                     // идентификатор заказа
    total: number;              // сумма заказ
}

interface IProductsModel {
    products: Product[] | null;      
    api: IProductsApi;
    setProducts(): void;            // async метод для получения списка Product[]
    getProduct(id: ID): Product;    // получения Product по id
}

interface IProductsApi {
    get products(): Promise<object>; // отправляет GET запрос на получение Product
}

interface IBasketModel {
    products: ID[]; 
    cost: number;
    add(id: ID): void;              // добавление товара в корзину
    remove(id: ID): void;           // удаление товара из корзины
}

interface IOrderModel {
    order: Order | null;
    orderApi: IOrderApi;
    submit(): OrderResponse;        // async метод для отправки формы Order
    reset(): void;                  // сброс формы Order
}

interface IOrderApi {
    submit(): Promise<object>;      // отправляет POST запрос с Order в теле запроса
}

interface IView {
    element: HTMLElement | null;    // элемент представления
    get template(): string;         // возвращает разметку
    remove(): void;                 // удаление элемента
}