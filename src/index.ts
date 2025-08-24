import './scss/styles.scss';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { API_URL } from './utils/constants';
import { AppState, Order, OrderSuccess, Product } from './types/index';
import { AppView } from './view/AppView';
import { Header } from './components/Header';
import { ProductModel } from './components/models/ProductModel';
import { Basket } from './components/Basket';
import { ProductModal } from './components/ProductModal';
import { Modal } from './components/Modal';
import { OrderModal } from './components/OrderModal';
import { ContactsModal } from './components/ContactsModal';
import { SuccessModal } from './components/SuccessModal';
import { MarketApi } from './components/MarketApi';

const initialState: AppState = {
  catalog: [],
  basket: [],
  preview: null,
  order: {
    payment: undefined,
    address: undefined,
    email: undefined,
    phone: undefined,
    items: [],
    total: 0
  }
};

const events = new EventEmitter();
const api = new Api(API_URL);
const marketApi = new MarketApi(api, events);
const model = new ProductModel(events, initialState);
const header = new Header(events);
const appView = new AppView(events);
const modal = new Modal(events);
const orderModal = new OrderModal(events);
const contactsModal = new ContactsModal(events);
const basket = new Basket(modal, events);

 events.on('catalog:needs-update', async () => {

    await model.loadProducts();
});

events.on('order:start', () => {
  orderModal.open();
});

events.emit('catalog:needs-update');


events.on('product:preview', (product: Product) => {
  if (!product) {
    console.error('Продукт не найден');
    return;
  }
  const inBasket = model.getState().basket.some(item => item.id === product.id);
  new ProductModal(product, events, inBasket);
});

events.on('basket:changed', () => {
  header.setCounter(model.getState().basket.length);
});


events.on('product:add', (product: Product) => {
  model.addToBasket(product);
});

events.on('basket:remove', (product: Product) => {
  model.removeFromBasket(product.id);
});

model.loadProducts()
  .catch(error => console.error('Ошибка загрузки товаров:', error));

events.on('order:submit', (orderData: { payment: 'card' | 'cash'; address: string }) => {
    model.getState().order = {
        ...model.getState().order,
        payment: orderData.payment,
        address: orderData.address,
        total: model.getState().basket.reduce((sum, item) => sum + (item.price || 0), 0)
    };
    
    orderModal.close();
    contactsModal.open();
});

events.on('order:success', () => {
    const total = model.getState().order.total;
    contactsModal.close();
    const successModal = new SuccessModal(events, total);
    successModal.open();
});



events.on('contacts:submit', (contactsData: { email: string; phone: string }) => {
    const state = model.getState();
    
    
    const orderPayload = {
        payment: state.order.payment,
        email: contactsData.email,
        phone: contactsData.phone,
        address: state.order.address,
        total: state.order.total,
        items: state.basket.map(item => item.id)
    };

    if (!orderPayload.address || !orderPayload.email || !orderPayload.phone || orderPayload.items.length === 0) {
        console.error('Не все данные заполнены');
        return;
    }

    api.post('/order', orderPayload)
        .then(() => {
            events.emit('order:success');
            model.clearBasket();
        })
        .catch(error => {
            console.error('Ошибка оформления заказа:', error);
            events.emit('order:error', error);
        });

        marketApi.buyProduct<OrderSuccess>(orderPayload)
        .then((data) => {
          console.log(data)
        })
});

marketApi.getProduct()
.then((data) => {
  console.log(data)
})

