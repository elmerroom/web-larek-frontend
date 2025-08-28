import { EventEmitter, IEvents } from '../base/events';
import { Product, AppState, ApiListResponse } from '../../types/index';


export class ProductModel {
  // private events: EventEmitter;
  state: AppState = {
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
  protected products: Product[] = []

  constructor(protected events: IEvents) {

    // вызов в конструкторе класса других классов является не верным решением, нужно пересмотреть дипсик и реализацию этого класса, также обратить внимание на интерфейс IApiMethods и класс MarketApi
    
    this.events = events;
  }

  addToBasket(product: Product): Product[] {
    if (!this.state.basket.some(item => item.id === product.id)) {
      this.state.basket.push(product);
    }
    return this.state.basket
  }

  removeFromBasket(productId: string) {
    this.state.basket = this.state.basket.filter(item => item.id !== productId);
  }

  getProducts(): Product[] {
    return this.state.catalog
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
    this.state.basket = [];
  }

  setProducts(products: Product[]) {
    this.state.catalog = products
    this.events.emit('product:changed')
  }

}