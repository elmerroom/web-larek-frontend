import { ApiPostMethods } from './../components/base/api';
export interface Product  {
  id: string;
  title: string;
  description: string;
  price: number | null;
  category: string;
  image: string;
};

export interface Order  {
  payment?: 'card' | 'cash';
  address?: string;
  email?: string;
  phone?: string;
  items?: string[];
  total: number;
};

export interface ApiListResponse<T>  {
    total: number;
    items: T[]
};

export interface AppState  {
  catalog: Product[];
  basket: Product[];
  preview: Product | null;
  order: Order;
};



export interface OrderSuccess {
  id: string;
  total : number;
}

export interface IApiMethods {
  get<T>(uri: string): Promise<T>;
  post<T>(uri: string, data: object, method: string): Promise<T>;
}