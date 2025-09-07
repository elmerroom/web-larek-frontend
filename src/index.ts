import './scss/styles.scss';
import { MarketApi } from './components/models/ProductApi';
import { EventEmitter } from './components/base/events';
import { API_URL } from './utils/constants';
import { Api } from './components/base/api';
import { ProductModel } from './components/models/ProductModel';
import { ProductCard } from './components/View/ProductCard';
import { cloneTemplate, ensureElement } from './utils/utils';
import { PageView } from './components/View/PageView';
import { ProductPreview } from './components/View/ProductPreview';
import { Product } from './types';
import { Modal } from './components/Common/Modal';
import { Basket } from './components/View/Basket';
import { BasketProduct } from './components/View/BasketProduct';
import { OrderView } from './components/View/OrderView';
import { Contacts } from './components/View/Contactsl';
import { Success } from './components/View/Success';


const events = new EventEmitter()
const api = new Api(API_URL)

const page = new PageView(document.querySelector('.page') as HTMLElement, events)

const marketApi = new MarketApi(api, events)
const productModel = new ProductModel(events)
const pageWrapper = ensureElement<HTMLElement>('.page__wrapper')
const modal = new Modal(document.querySelector('#modal-container'), events, pageWrapper)

const productTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const productPrivewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const basketCardTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;

const successTemplate = document.querySelector('#success') as HTMLTemplateElement;


const basket = new Basket(cloneTemplate(basketTemplate), events)
const orderView = new OrderView(cloneTemplate(orderTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events)
const success = new Success(cloneTemplate(successTemplate), events)



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

events.on('productModal:rerender', (product: Product) => {
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

events.on('productModal:open', (product: Product) => {
  events.emit('productModal:rerender', product)
})

events.on('basketModal:open', () => {
  const basketItems = productModel.getBasket()
  modal.open(basket.createBasketModal(basketItems))

  
})

events.on('orderModal:open', () => {
  modal.open(orderView.render())
})

events.on('product:add', (product: Product) => {
  productModel.addToBasket(product);
  modal.close()
  const productModal = new ProductPreview(cloneTemplate(productPrivewTemplate),events, product).render({
     id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    image: product.image,
    inBasket: productModel.isInBasket(product.id)}
  )
  modal.open(productModal)
});

events.on('basket:removeProduct', (product: Product) => {

  productModel.removeFromBasket(product.id);
  modal.close()
  const basketItems = productModel.getBasket()
  modal.open(basket.createBasketModal(basketItems))
});

events.on('product:removeProduct', (product: Product) => {
  productModel.removeFromBasket(product.id);
  events.emit('productModal:rerender', product)
});



events.on('modal:close', () => {
  modal.close()
})

events.on('order:payCategory', (item: {name: 'card' | 'cash'}) => {
  const category = item.name
  // const [values] = [...category]
  productModel.setPaymentValue(category)
  
}) 

events.on("form:reset", (form: HTMLFormElement) => {
  form.reset()
})

events.on('order:submit', () => {
  orderView.closeOrderModal()
  modal.open(contacts.render())
})

events.on('validate:inspect', (text: HTMLInputElement) => {
  productModel.setAdress(text.value)
  orderView.render({
  validData: productModel.getValidAdress(),
  validButton: productModel.getValidButtons()
})
})

events.on('validateButton:inspect', () => {
  orderView.render({
    validData: productModel.getValidAdress(),
  validButton: productModel.getValidButtons()
  })
})

events.on('contacts:input', (data: {
  field: string;
  value: string
}) => {
  productModel.setContacts(data.field, data.value)
  const isValid = productModel.validateInputs()
  contacts.render({
    valid: isValid
  })
})

events.on("order:success", () => {
  modal.close();
  contacts.closeContactsModal()
  modal.open(success.render({
    total: productModel.updateOrderTotal()
  }))
  events.emit("basket:reset");
  events.emit('order:reset');
})

events.on('basket:reset', () => {
  productModel.clearBasket();
  events.emit('basket:changed');

})

events.on('order:reset', () => {
  productModel.clearOrder()
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