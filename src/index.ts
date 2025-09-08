import './scss/styles.scss';
import { MarketApi } from './components/models/ProductApi';
import { EventEmitter } from './components/base/events';
import { API_URL } from './utils/constants';
import { Api } from './components/base/api';
import { ProductModel } from './components/models/ProductModel';
import { ProductCard } from './components/View/ProductCard';
import { cloneTemplate } from './utils/utils';
import { PageView } from './components/View/PageView';
import { ProductPreview } from './components/View/ProductPreview';
import { IProduct } from './types';
import { Modal } from './components/Common/Modal';
import { Basket } from './components/View/Basket';
import { BasketProduct } from './components/View/BasketProduct';
import { OrderView } from './components/View/OrderView';
import { ContactsView } from './components/View/ContactsView';
import { SuccessView } from './components/View/SuccessView';


const events = new EventEmitter()
const api = new Api(API_URL)

const page = new PageView(document.querySelector('.page') as HTMLElement, events)

const marketApi = new MarketApi(api, events)
const productModel = new ProductModel(events)
const modal = new Modal(document.querySelector('#modal-container'), events)

const productTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const productPrivewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const basketCardTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;

const successTemplate = document.querySelector('#success') as HTMLTemplateElement;


const basket = new Basket(cloneTemplate(basketTemplate), events)
const orderView = new OrderView(cloneTemplate(orderTemplate), events);
const contacts = new ContactsView(cloneTemplate(contactsTemplate), events)
const success = new SuccessView(cloneTemplate(successTemplate), events)



marketApi.getProduct()
.then((data) => {
productModel.setProducts(data)
})
.catch((error) => {
    console.error('Error loading products:', error);
  })


events.on('product:changed', () => {
  const ProductHTMLArray = productModel.getProducts().map(product => 
    new ProductCard(cloneTemplate(productTemplate), events, product).render(product)
  )

  page.render({
    productList: ProductHTMLArray,
    count: productModel.getTotal()
  })
})

 events.on('basket:changed', () => {
    page.render({
    count: productModel.getTotal()
  })

  const itemBasketHTMLArray = productModel.getBasket().map((product, index) => {
    const basketProduct = new BasketProduct(cloneTemplate(basketCardTemplate), events, product)

    basketProduct.index = String(index + 1);
    return basketProduct.render(product)
  })

  basket.render({
    basketListItem: itemBasketHTMLArray,
    orderTotalPrice: productModel.updateOrderTotal()
  })
  })

events.on('productModal:render', (product: IProduct) => {
  modal.close()
  const inBasket = productModel.isInBasket(product.id)
  const productModal = new ProductPreview(cloneTemplate(productPrivewTemplate),events, product).render({
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


events.on('productModal:preview', (item: {preview: boolean}) => {
productModel.togglePreview(item.preview)
})

events.on('basketModal:open', () => {
  const basketItems = productModel.getBasket()
  modal.open(basket.createBasketModal(basketItems))

})

events.on('orderModal:open', () => {
  const order = productModel.getOrder();
  modal.open(orderView.render({
    payment: order.payment,
    address: order.address || '',
    valid: false,  
    errors: []     
  }));
})

events.on('product:add', (product: IProduct) => {
  productModel.addToBasket(product);
});

events.on('basket:removeProduct', (product: IProduct) => {

  productModel.removeFromBasket(product);
});

events.on('product:removeProduct', (product: IProduct) => {
  productModel.removeFromBasket(product);
});

events.on('payment:select', (data: { payment: 'card' | 'cash' }) => {
  productModel.setOrderField('payment', data.payment);
  productModel.validateOrderForm();
  const order = productModel.getOrder();
  orderView.render({
    payment: order.payment,
    address: order.address || '',
    valid: productModel.isOrderValid(),
    errors: productModel.getOrderErrors()
  });
});

events.on('order.address:change', (data: { field: string; value: string }) => {
  productModel.setOrderField('address', data.value);
  productModel.validateOrderForm();
  const order = productModel.getOrder();
  orderView.render({
    payment: order.payment,
    address: order.address || '',
    valid: productModel.isOrderValid(),
    errors: productModel.getOrderErrors()
  });
});

events.on('order:submit', () => {
  const order = productModel.getOrder();
  modal.open(contacts.render({
    email: order.email || '',
    phone: order.phone || '',
    valid: false, 
    errors: []    
  }));
})

events.on('contacts.email:change', (data: { field: string; value: string }) => {
  productModel.setOrderField('email', data.value);
  productModel.validateContactsForm();  
  const order = productModel.getOrder();
  contacts.render({
    email: order.email || '',
    phone: order.phone || '',
    valid: productModel.isContactsValid(),
    errors: productModel.getContactsErrors()
  });
});

events.on('contacts.phone:change', (data: { field: string; value: string }) => {
  productModel.setOrderField('phone', data.value);
  productModel.validateContactsForm();  
  const order = productModel.getOrder();
  contacts.render({
    email: order.email || '',
    phone: order.phone || '',
    valid: productModel.isContactsValid(),
    errors: productModel.getContactsErrors()
  });
});

events.on("order:success", () => {
  modal.close();
  modal.open(success.render({
    total: productModel.updateOrderTotal()
  }))
  productModel.clearBasket();
  events.emit('basket:changed');
  productModel.clearOrder()
})

events.on('order:reset', () => {
  productModel.clearOrder()
})

events.on('success:close', () => {
  modal.close()
})

events.on('contacts:submit', () => {
  marketApi.buyProduct(productModel.successOrder())
  .then(() => {
    events.emit('order:success')
  })
  .catch((erorr) => {
    console.log(erorr)
  })
})

events.on('modal:open', () => {
    page.locked = true;
});

events.on('modal:close', () => {
    page.locked = false;
});