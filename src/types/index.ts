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