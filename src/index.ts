import './scss/styles.scss';
import { API_URL } from './utils/constants';
import ProductsApi from './components/model/products-api';
import ProductsModel from './components/model/products-model';
import BasketModel from './components/model/basket-model';
import ProductCatalogPresenter from './components/presenter/product-catalog-presentor';
import ModalPresenter from './components/presenter/modal-presenter';
import BasketPresenter from './components/presenter/basket-presenter';
import { EventEmitter } from './components/base/events';

const gallery = document.querySelector('.gallery');
const modalContainer = document.querySelector('.page');
const headerContainer = document.querySelector('.header__container');

const productsApi = new ProductsApi(API_URL);
const productsModel = new ProductsModel(productsApi);
const basketModel = new BasketModel();

const emitter = new EventEmitter();

const modalPresenter = new ModalPresenter(modalContainer);
const productCatalogPresenter = new ProductCatalogPresenter(productsModel, gallery, modalPresenter, basketModel, emitter);
const basketPresenter = new BasketPresenter(basketModel, headerContainer, modalPresenter, productsModel, emitter);

async function initProducts(){
    await productsModel.setProducts();
    productCatalogPresenter.init();
    modalPresenter.init();
}

basketPresenter.init();
initProducts();

