import { EventEmitter, IEvents } from '../base/events';
import { Product, AppState, ApiListResponse, Order } from '../../types/index';
import { isEmpty } from '../../utils/utils';


export class ProductModel {
  // private events: EventEmitter;
  state: AppState = {
  catalog: [],
  basket: [],
  preview: null,
  order: {
    payment:  undefined,
    address: null,
    email: undefined,
    phone: undefined,
    items: [],
    total: 0
  }
};
  protected products: Product[] = []

  constructor(protected events: IEvents) {

    // вызов в конструкторе класса других классов является не верным решением, нужно пересмотреть дипсик и реализацию этого класса, также обратить внимание на интерфейс IApiMethods и класс MarketApi
    
    this.events = events;
  }

  addToBasket(product: Product): Product[] {
    if (!this.state.basket.some(item => item.id === product.id)) {
      this.state.basket.push(product);
    }
    this.events.emit('basket:changed')
    return this.state.basket
  }

  removeFromBasket(productId: string) {
    this.state.basket = this.state.basket.filter(item => item.id !== productId);
    this.events.emit('basket:changed')
  }

  getProducts(): Product[] {
    return this.state.catalog
  }

  getProduct(id: string): Product {
    return this.state.catalog.find(item => item.id === id)
  }

  getTotal() {
    return this.state.basket.length
  }

  updateOrderTotal(): number {
    this.state.order.total = this.state.basket.reduce(
        (sum, item) => sum + (item.price || 0), 0
    );
    return this.state.order.total
  }

  clearBasket() {
    this.events.emit('basket:changed')
    this.state.basket = [];
  }

  setProducts(products: Product[]) {
    this.state.catalog = products
    this.events.emit('product:changed')
  }

  getBasket(): Product[] {
    return this.state.basket
  };

   getState(): AppState {
    return this.state;
  }

  getOrder(): Order {
    return this.state.order
  }

  isInBasket(productId: string): boolean {
    return this.state.basket.some(item => item.id === productId);
  }

  validateInput(text: string): boolean {
    // if (text.length === 0) {
    //   return false
    // }
    // console.log(text.length > 0)
    const email: string | undefined = this.state.order.email;
    const phone: string | undefined = this.state.order.phone
    return !!email && email.length > 0 && !!phone && phone.length > 0
  }

  validateButton(buttons: HTMLButtonElement[]): boolean  {
    const validateBoolean = buttons.some(element => {
     return element.classList.contains('button_alt-active');

    });
    return validateBoolean
  }

  validateAdress(value: string): boolean {
    this.state.order.address = value
    const adress = this.state.order.address;
    
    // if (adress === null || adress === undefined || adress.length < 0 || adress === '') {
    //   return false
    // }

    // return true
    if (adress.length > 0) {
      return true
    }

    return false
  }

  setAdress(value:string) {
    this.state.order.address = value
  }

  getValidAdress():boolean {
    const adress: string | undefined = this.state.order.address;  // Уточните тип для ясности
    return !!adress && adress.length > 0;
  }

  getValidButtons(): boolean {
    const payment = this.state.order.payment
    return (payment === 'card' || payment === 'cash')
  }

  setContacts(name: string, value: string) {
    if (name === "email") {
      this.state.order.email = value
      // const email = this.state.order.email
      return
    }
    if (name === "phone") {
      this.state.order.phone = value
      return
    }
    return
  }

}