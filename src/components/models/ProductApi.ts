import { Product, Order, IApiMethods, ApiListResponse } from '../../types/index';
import { EventEmitter } from '../base/events';

export class MarketApi {

  api: IApiMethods;
  private cache: Product[] | null;

  constructor(api: IApiMethods, private events: EventEmitter) {
    this.api = api
  }

  async getProduct(): Promise<Product[]> {

    if (this.cache) {
            return this.cache;
        }

        try {
            // Загружаем данные с сервера
            const response = await this.api.get<ApiListResponse<Product>>('/product');
            this.cache = response.items;
            return this.cache;
        } catch (error) {
            throw error;
        }
  }

  buyProduct<T>(order: Order): Promise<T> {
    return this.api.post<T>('/order', order, 'POST')
  }
}