export type Product =  {
  id: string;
  title: string;
  description: string;
  price: number | null;
  category: string;
  image: string;
};

export type Order = {
  payment?: 'card' | 'cash' | null;
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

export type AppState = {
  catalog: Product[];
  basket: Product[];
  preview: Product | null;
  order: Order;
};

export interface IApiMethods {
  get<T>(uri: string): Promise<T>;
  post<T>(uri: string, data: object, method: string): Promise<T>;
}