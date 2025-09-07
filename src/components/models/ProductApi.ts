import { IProduct, IOrder, IApiMethods, ApiListResponse } from '../../types/index';
import { EventEmitter } from '../base/events';

export class MarketApi {

  api: IApiMethods;
  private cache: IProduct[] | null;

  constructor(api: IApiMethods, private events: EventEmitter) {
    this.api = api
  }

  async getProduct(): Promise<IProduct[]> {

    if (this.cache) {
            return this.cache;
        }

        try {
            // Загружаем данные с сервера
            const response = await this.api.get<ApiListResponse<IProduct>>('/product');
            this.cache = response.items;
            return this.cache;
        } catch (error) {
            throw error;
        }
  }

  buyProduct<T>(order: IOrder): Promise<T> {
    return this.api.post<T>('/order', order, 'POST')
  }
}