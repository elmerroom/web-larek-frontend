// import './scss/styles.scss';
// import { Api } from './components/base/api';
// import { EventEmitter } from './components/base/events';
// import { API_URL } from './utils/constants';
// import { AppState, Order, OrderSuccess, Product } from './types/index';
// import { AppView } from './view/AppView';
// import { Header } from './components/Header';
// import { ProductModel } from './components/models/ProductModel';
// import { Basket } from './components/Basket';
// import { ProductModal } from './components/ProductModal';
// import { Modal } from './components/Modal';
// import { OrderModal } from './components/OrderModal';
// // import { ContactsModal } from './components/ContactsModal';
// import { SuccessModal } from './components/SuccessModal';
// import { MarketApi } from './components/MarketApi';
// import { ensureElement } from './utils/utils';
// import { ProductCard } from './components/ProductCard';

// const initialState: AppState = {
//   catalog: [],
//   basket: [],
//   preview: null,
//   order: {
//     payment: undefined,
//     address: undefined,
//     email: undefined,
//     phone: undefined,
//     items: [],
//     total: 0
//   }
// };

// const events = new EventEmitter();
// const api = new Api(API_URL);
// const marketApi = new MarketApi(api, events);
// const model = new ProductModel(events, initialState);
// const header = new Header(events);
// const appView = new AppView(events);
// const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
// const orderModal = new OrderModal(ensureElement<HTMLElement>('#modal-container'), events);
// // const contactsModal = new ContactsModal(events);
// const basket = new Basket(modal, events);

// // const card = new ProductCard()

//  events.on('catalog:needs-update', async () => {

//     await model.loadProducts();
// });

// events.on('basket:open', () => {
//     const basket = new Basket(modal, events, model.getState().basket);
//     modal.open(basket.getElement());
// });

// events.on('order:start', () => {
//   // orderModal.open();
//   modal.open(orderModal.render());
// });

// events.emit('catalog:needs-update');


// events.on('product:preview', (product: Product) => {
//   // if (!product) {
//   //   console.error('Продукт не найден');
//   //   return;
//   // }
//   // const inBasket = model.getState().basket.some(item => item.id === product.id);
//   // new ProductModal(product, events, inBasket);
//   const inBasket = model.isInBasket(product.id);
//     const productModal = new ProductModal(product, events, inBasket);
//     modal.content = productModal.render();
//     modal.open();
// });

// events.on('basket:changed', () => {
//   header.setCounter(model.getState().basket.length);
// });


// events.on('product:add', (product: Product) => {
//   model.addToBasket(product);
// });

// events.on('basket:remove', (product: Product) => {
//   model.removeFromBasket(product.id);
// });

// model.loadProducts()
//   .catch(error => console.error('Ошибка загрузки товаров:', error));

// events.on('order:submit', (orderData: { payment: 'card' | 'cash'; address: string }) => {
//     model.getState().order = {
//         ...model.getState().order,
//         payment: orderData.payment,
//         address: orderData.address,
//         total: model.getState().basket.reduce((sum, item) => sum + (item.price || 0), 0)
//     };
    
//     // orderModal.close();
//     // contactsModal.open();
// });

// events.on('order:success', () => {
//     const total = model.getState().order.total;
//     // contactsModal.close();
//     const successModal = new SuccessModal(ensureElement<HTMLElement>('#modal-container'),events, total);
//     // successModal.open();
//     modal.open(successModal.render());
// });



// events.on('contacts:submit', (contactsData: { email: string; phone: string }) => {
//     const state = model.getState();
    
    
//     const orderPayload = {
//         payment: state.order.payment,
//         email: contactsData.email,
//         phone: contactsData.phone,
//         address: state.order.address,
//         total: state.order.total,
//         items: state.basket.map(item => item.id)
//     };

//     if (!orderPayload.address || !orderPayload.email || !orderPayload.phone || orderPayload.items.length === 0) {
//         console.error('Не все данные заполнены');
//         return;
//     }

//     api.post('/order', orderPayload)
//         .then(() => {
//             events.emit('order:success');
//             model.clearBasket();
//         })
//         .catch(error => {
//             console.error('Ошибка оформления заказа:', error);
//             events.emit('order:error', error);
//         });

//         marketApi.buyProduct<OrderSuccess>(orderPayload)
//         .then((data) => {
//           console.log(data)
//         })
// });

// marketApi.getProduct()
// .then((data) => {
//   console.log(data)
// })

import './scss/styles.scss';
import { MarketApi } from './components/newComponents/ProductApi';
import { EventEmitter } from './components/base/events';
import { API_URL } from './utils/constants';
import { Api } from './components/base/api';
import { ProductModel } from './components/newComponents/ProductModel';
import { ProductCard } from './components/newComponents/ProductCard';
import { cloneTemplate } from './utils/utils';
import { PageView } from './components/newComponents/PageView';
import { ProductModal } from './components/newComponents/ProductModal';
import { Product } from './types';
import { Modal } from './components/newComponents/Common/Modal';


const events = new EventEmitter()
const api = new Api(API_URL)

const gallery = document.querySelector('.gallery') as HTMLElement;

const page = new PageView(document.querySelector('.page') as HTMLElement, events)

const marketApi = new MarketApi(api, events)

const productModel = new ProductModel(events)

const peoductTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;

const modal = new Modal(document.querySelector('#modal-container'), events)

const modalConteiner = document.querySelector('#card-preview') as HTMLTemplateElement;

const productModal = new ProductModal()


console.log(productModel)
// console.log(productModal)

// console.log(marketApi.getProduct().then((data) => {

// }))
console.log(page)


marketApi.getProduct()
.then((data) => {
// console.log(data)
productModel.setProducts(data)
// console.log(productModel.getProducts())
// console.log(productModel.addToBasket(productModel.getProducts()[1]))
// productModel.updateOrderTotal()

})
.catch((error) => {
    console.error('Error loading products:', error);
  })

// const gallery = document.querySelector('.gallery') as HTMLElement;
// const card1 = new ProductCard(cloneTemplate(peoductTemplate))

// card1.category = 'софт-скил'
// card1.name = "Мфмка-таймер"
// card1.price = null;
// card1.image = "/Asterisk_2.svg"

// gallery.append(card1.render())

events.on('product:changed', () => {
  const ProductHTMLArray = productModel.getProducts().map(product => 
    new ProductCard(cloneTemplate(peoductTemplate), events, product).render(product)
  )

  page.render({
    productList: ProductHTMLArray,
    count: productModel.getTotal()
  })
})

events.on('productModal:open', (product: Product) => {
  // prodductModal.open()
  // console.log('click')
  // console.log(item)
  // const openModal = productModel.getProduct(item)
  // console.log(product.description)
  // const {product} = event;
  // const card = productModel.getProduct(product.id)
  // console.log(card.price)
  // productModal
  console.log(product)
  modal.content = productModal.createProductContent(product)
  // modal.render(product)
  console.log(" ну и ну", productModal.createProductContent(product))
  // console.log("ye b ", modal)
  // productModal.render(
  //   productModal.createProductContent(product)
  //   // product
  // )
  modal.open(productModal.createProductContent(product))
  // console.log(productModal.render(product))
  // modal.render(productModal.render(product))
  // const { title, description, price, category, image} = productModel.getProduct(product.id)
  // const card = { title, description, price, category, image};
  // productModal.content = productModal.render(card)
  // productModal.open()
  // console.log(productModel.getTotal())
  // productModal.render({
  //   id: event.id,
  //   title: event.title
  // })
  // console.log('hi')
  // console.log(Object.values(event)[0].id)
})