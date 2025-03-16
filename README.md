# 3 курс
# Рудовский Егор Александрович
# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом
- src/types/ — папка с типами

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```


## Архитектура

В проекте реализован паттерн MVP (Model View Presenter):

- Model - (Модель) работает с данными, проводит вычисления и руководит всеми бизнес-процессами.
- View - (Вид или представление) показывает пользователю интерфейс и данные из модели.
- Presenter - Связывает Model и View, обрабатывает пользовательский ввод и события.

## Базовый код

- Класс EventEmitter

Реализует паттерн "Наблюдатель". Обеспечивает работу событий. Его функции: возможность установить и снять слушателей событий, вызвать слушателей при возникновении события.

Класс имеет ключевые методы: 
    on — для подписки на событие,  
    off — для отписки от события,
    emit  — для уведомления подписчиков о наступлении события.


- Класс Api

Класс для выполнения HTTP-запросов.

Класс имеет ключевые методы:
    get - для выполнения GET запросов,
    post - для выполнения POST запросов.

## API

- ProductApi - класс для получения спика Product, имплементирует интерфейс 
IProductApi и наследует от Api.  
Экземпляр класcа передается в конструктор ProductsModel.
    - get products(): Promise<object>; // отправляет GET запрос на получение Product

- OrderApi - класс для отправки Order, имплементирует интерфейс 
IOrderApi и наследует от Api.  
Экземпляр класса передается в конструктор OrderModel.
    - submit(): Promise<object>;      // отправляет POST запрос с Order в теле запроса

## Компоненты модели данных

- ProductsModel - класс модель для управлением товарами внутри каталога,
имплементирует интерфейс IProductsModel, наследует EventEmitter. 
    - products: Product[] | null;      
    - api: IProductsApi;
    - setProducts(): void;            // async метод для получения списка Product[]
    - getProduct(id: ID): Product;    // получения Product по id

- BasketModel - класс модель для управления товарами внутри корзины,
имплементирует интерфейс IBasketModel, наследует EventEmitter
    - products: ID[]; 
    - cost: number;
    - add(id: ID): void;              // добавление товара в корзину
    - remove(id: ID): void;           // удаление товара из корзины

- OrderModel - класс модель для управления данными внутри заказа,
имплементирует интерфейс IOrderModel, наследует EventEmitter.
    - order: Order | null;
    - orderApi: IOrderApi;
    - submit(): OrderResponse;        // async метод для отправки формы Order
    - reset(): void;                  // сброс формы Order

## Компоненты представления

- View - абстрактный класс представления имплементирует интерфейс IView
    - element: HTMLElement | null;    // элемент представления
    - get template(): string;         // возвращает разметку
    - remove(): void;                 // удаление элемента
    
- ProductListView - класс представление каталога товаров наследует от View

- ProductView - класс представление карточки товара наследует от View

- ModalView - класс представление обертки модальных окон наследует от View. 
В конструктор будет принимать экземпляр классов 
(ProductView/BasketView/OrderPaymentView/OrderContactsView/OrderSuccessView).

- BasketView - класс представление корзины товаров наследует от View

- OrderPaymentView - класс представление оформления заказа (этап 1) наследует от View

- OrderContactsView - класс представление оформление заказа (этап 2) наследует от View

- OrderSuccessView - класс представление успешно офрмленного заказа наследует от View


## Ключевые типы данных

```
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
```