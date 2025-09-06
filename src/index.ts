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
import { cloneTemplate, ensureElement } from './utils/utils';
import { PageView } from './components/newComponents/PageView';
import { ProductModal } from './components/newComponents/ProductModal';
import { AppState, Order, Product } from './types';
import { Modal } from './components/newComponents/Common/Modal';
import { BasketModal } from './components/newComponents/BasketModal';
import { BasketProduct } from './components/newComponents/BasketProduct';
import { OrderModal } from './components/newComponents/OrderModal';
import { ContactsModal } from './components/newComponents/ContactsModal';


const events = new EventEmitter()
const api = new Api(API_URL)

const gallery = document.querySelector('.gallery') as HTMLElement;

const page = new PageView(document.querySelector('.page') as HTMLElement, events)

const marketApi = new MarketApi(api, events)

const productModel = new ProductModel(events)

const modal = new Modal(document.querySelector('#modal-container'), events)

const productTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const productPrivewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;

const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;

const basketCardTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;

const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
// const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;



const modalConteiner = document.querySelector('#card-preview') as HTMLTemplateElement;

// const productModal = new ProductModal(cloneTemplate(productPrivewTemplate),events, product)
const basketModal = new BasketModal(cloneTemplate(basketTemplate), events)
const orderModal = new OrderModal(cloneTemplate(orderTemplate), events);
const contactsModal = new ContactsModal(cloneTemplate(contactsTemplate), events)


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


events.on('product:changed', () => {
  console.log('product:changed')
  const ProductHTMLArray = productModel.getProducts().map(product => 
    new ProductCard(cloneTemplate(productTemplate), events, product).render(product)
  )

  page.render({
    productList: ProductHTMLArray,
    count: productModel.getTotal()
  })
})

 events.on('basket:changed', (product: Product) => {
    page.render({
    // productList: ProductHTMLArray,
    count: productModel.getTotal()
  })

  const ItemBasketHTMLArray = productModel.getBasket().map((product, index) => {
    const basketProduct = new BasketProduct(cloneTemplate(basketCardTemplate), events, product)

    basketProduct.index = String(index + 1);
    return basketProduct.render(product)
  })

  basketModal.render({
    basketListItem: ItemBasketHTMLArray,
    orderTotalPrice: productModel.updateOrderTotal()
  })
  })

events.on('productModal:rerender', (product: Product) => {
  modal.close()
  const inBasket = productModel.isInBasket(product.id)
  const productModal = new ProductModal(cloneTemplate(productPrivewTemplate),events, product).render({
    id: product.id,
  title: product.title,
  description: product.description,
  price: product.price,
  category: product.category,
  image: product.image,
  inBasket: inBasket
    })
  modal.open(productModal)
})

events.on('productModal:open', (product: Product) => {
  console.log("productModal:open")
  // modal.content = productModal.createProductContent(product)
  // const inBasket = productModel.isInBasket(product.id)
  // const productModal = new ProductModal(cloneTemplate(productPrivewTemplate),events, product).render({
  //   id: product.id,
  // title: product.title,
  // description: product.description,
  // price: product.price,
  // category: product.category,
  // image: product.image,
  // inBasket: inBasket
  //   })
  // modal.open(productModal)
  events.emit('productModal:rerender', product)
})

events.on('basketModal:open', () => {
  console.log('basketModal:open')
  const basketItems = productModel.getBasket()
  modal.open(basketModal.createBasketModal(basketItems))

  
})

events.on('orderModal:open', () => {
  console.log("orderModal:open")
  // console.log(orderModal.render())
  modal.open(orderModal.render())
})

events.on('product:add', (product: Product) => {
  productModel.addToBasket(product);
  modal.close()
  const productModal = new ProductModal(cloneTemplate(productPrivewTemplate),events, product).render({
     id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    image: product.image,
    inBasket: productModel.isInBasket(product.id)}
  )
  modal.open(productModal)
  
  console.log('product:add');
});

events.on('basket:removeProduct', (product: Product) => {
  // const basket = productModel.getBasket()
  productModel.removeFromBasket(product.id);
  console.log('basket:remove')
  // events.emit('productModal:rerender', product)
  modal.close()
  const basketItems = productModel.getBasket()
  modal.open(basketModal.createBasketModal(basketItems))
});

events.on('product:removeProduct', (product: Product) => {
  // const basket = productModel.getBasket()
  productModel.removeFromBasket(product.id);
  console.log('basket:remove')
  events.emit('productModal:rerender', product)
  
});



events.on('modal:close', () => {
  modal.close()
  console.log('modal:close')
  orderModal.closeOrderModal()
  contactsModal.closeContactsModal()
})

events.on('order:payCategory', (item) => {
  console.log('order:payCategory')
  const category = Object.values(item)
  const [values] = [...category]
  // console.log(Object.values(item))
  // console.log(values)
  productModel.getState().order.payment = values
  // console.log(productModel.getState())

  events.emit('order:change:button', productModel.getOrder())
  // console.log(productModel.getOrder)
}) 

events.on('order:submit', (data: Order) => {
  // const orderAdress = data.address
  orderModal.closeOrderModal()
  // productModel.state.order.address = orderAdress
  // console.log(productModel.getOrder());
  modal.open(contactsModal.render())
})

events.on('validate:inspect', (text: HTMLInputElement) => {
  productModel.setAdress(text.value)
  // productModel.validateInput(text.value)
  // console.log(productModel.getValidAdress(), productModel.getValidButtons())
  // const isValid = productModel.validateAdress(text.value)
orderModal.render({
  validData: productModel.getValidAdress(),
  validButton: productModel.getValidButtons()
})
})

events.on('validateButton:inspect', (buttons: HTMLButtonElement[]) => {
// productModel.validateButton(buttons)
// console.log(productModel.getValidAdress(), productModel.getValidButtons())
  orderModal.render({
    validData: productModel.getValidAdress(),
  validButton: productModel.getValidButtons()
  })
})

events.on('contacts:input', (data: {
  field: string;
  value: string
}) => {
  productModel.setContacts(data.field, data.value)
  const isValid = productModel.validateInput(data.value)
  contactsModal.render({
    valid: isValid
  })
})

events.on("contacts:submit", () => {
  contactsModal.closeContactsModal()
})