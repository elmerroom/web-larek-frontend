import { IEvents } from '../base/events';
import { Product, AppState, Order } from '../../types/index';



export class ProductModel {
  state: AppState = {
  catalog: [],
  basket: [],
  preview: null,
  order: {
    payment:  undefined,
    address: null,
    email: undefined,
    phone: undefined,
    // items: [],
    // total: 0
  }
};
  protected products: Product[] = []

  constructor(protected events: IEvents) {   
    this.events = events;
  }

  addToBasket(product: Product): Product[] {
    if (!this.state.basket.some(item => item.id === product.id)) {
      this.state.basket.push(product);
    }
    this.events.emit('basket:changed')

    // this.state.order.items = this.state.basket.map(product => product.id)
    return this.state.basket
  }

  removeFromBasket(productId: string) {
    this.state.basket = this.state.basket.filter(item => item.id !== productId);
    this.events.emit('basket:changed');
    // this.state.order.items = this.state.basket.map(product => product.id)
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
    // this.state.order.total = this.state.basket.reduce(
    //     (sum, item) => sum + (item.price || 0), 0
    // );
    return this.state.basket.reduce(
        (sum, item) => sum + (item.price || 0), 0
    );
  }

  clearBasket() {
    this.events.emit('basket:changed')
    this.state.basket = [];
  }

  clearOrder() {
    this.state.order = {
      payment:  undefined,
    address: null,
    email: undefined,
    phone: undefined,
    // items: [],
    // total: 0
    }
  }

 

  successOrder(): Order {
    const order = this.state.order
    order.total = this.state.basket.reduce(
        (sum, item) => sum + (item.price || 0), 0
    );
    order.items = this.state.basket.map(product => product.id)
    return order
  }

  setProducts(products: Product[]) {
    this.state.catalog = products
    this.events.emit('product:changed')
  }

  getBasket(): Product[] {
    return this.state.basket
  };

  //  getState(): AppState {
  //   return this.state;
  // }

  getOrder(): Order {
    return this.state.order
  }

  setPaymentValue(value: 'cash' | 'card') {
    this.state.order.payment = value;
    this.events.emit('order:change:button', this.state.order)
  }

  isInBasket(productId: string): boolean {
    return this.state.basket.some(item => item.id === productId);
  }

  validateInputs(): boolean {
    const email: string | undefined = this.state.order.email;
    const phone: string | undefined = this.state.order.phone
    return !!email && email.length > 0 && !!phone && phone.length > 0
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