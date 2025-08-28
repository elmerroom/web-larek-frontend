import { Product, Order, OrderSuccess, AppState, IApiMethods, ApiListResponse } from '../../types/index';
import { EventEmitter } from '../base/events';

export class MarketApi {

  api: IApiMethods;
  private cache: Product[] | null;

  constructor(api: IApiMethods, private events: EventEmitter) {
    this.api = api
    // private cache: 
  }

  async getProduct(): Promise<Product[]> {
    // const response = await this.method.get<ApiListResponse<Product>>('/product');
    // return response.items

    if (this.cache) {
            this.events.emit('products:loaded', this.cache);
            return this.cache;
        }

        try {
            // Загружаем данные с сервера
            const response = await this.api.get<ApiListResponse<Product>>('/product');
            this.cache = response.items;
            this.events.emit('products:loaded', this.cache);
            return this.cache;
        } catch (error) {
            this.events.emit('product:error', error);
            throw error;
        }
  }

  buyProduct<T>(order: Order): Promise<T> {
    return this.api.post<T>('/order', order, 'POST')
  }
}