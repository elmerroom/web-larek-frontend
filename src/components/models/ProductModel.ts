import { Api } from '../base/api';
import { EventEmitter } from '../base/events';
import { Product, AppState, ApiListResponse } from '../../types/index';
import { API_URL } from '../../utils/constants';
import { MarketApi } from '../MarketApi';


export class ProductModel {
  private events: EventEmitter;
  state: AppState;
  marketApi: MarketApi

  constructor(events: EventEmitter, initialState: AppState) {

    // вызов в конструкторе класса других классов является не верным решением, нужно пересмотреть дипсик и реализацию этого класса, также обратить внимание на интерфейс IApiMethods и класс MarketApi
    
    this.events = events;
    this.state = initialState
  }

  async loadProducts(): Promise<void> {
    try {
      // const response = await this.api.get('/product');
      // console.log("response",  response)
      // const response2: ApiListResponse<Product> = await this.marketApi.getProduct()
      // console.log("response2", response2)
      // this.state.catalog = response2.items



      // this.state.catalog = (response as ApiListResponse<Product>).items;
      
      // this.state.catalog = (response2 as ApiListResponse<Product>).items
      
      // await this.marketApi.getProduct()
      // const result = this.state.catalog
      
      this.events.emit('products:loaded', this.state.catalog);
      // console.log(result[0])
    } catch (error) {
      this.events.emit('product:error', error);
    }
  }

  addToBasket(product: Product): void {
    if (!this.state.basket.some(item => item.id === product.id)) {
      this.state.basket.push(product);
      this.updateBasket();
      this.updatePreviewStatus(product.id);
    }
  }

  removeFromBasket(productId: string): void {
    this.state.basket = this.state.basket.filter(item => item.id !== productId);
    this.updateBasket();
    this.updatePreviewStatus(productId);
  }

  private updateBasket(): void {
    this.events.emit('basket:changed', this.state.basket);
    this.updateOrderTotal();
  }

  private updateOrderTotal(): void {
  this.state.order.total = this.state.basket.reduce(
        (sum, item) => sum + (item.price || 0), 0
    );
    this.events.emit('order:total', { total: this.state.order.total });
  }

  setPreview(product: Product): void {
    this.state.preview = product;
    const inBasket = this.state.basket.some(item => item.id === product.id);
    this.events.emit('product:preview', { product, inBasket });
  }

  private updatePreviewStatus(productId: string): void {
    if (this.state.preview && this.state.preview.id === productId) {
      const inBasket = this.state.basket.some(item => item.id === productId);
      this.events.emit('product:preview:update', { 
        productId, 
        inBasket 
      });
    }
  }

  getState(): AppState {
    return this.state;
  }

  clearBasket(): void {
    this.state.basket = [];
    this.updateOrderTotal();
    this.events.emit('basket:changed', this.state.basket);
  }

  isInBasket(productId: string): boolean {
    return this.state.basket.some(item => item.id === productId);
  }
}