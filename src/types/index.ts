export type Product = {
  id: string;
  title: string;
  description: string;
  price: number | null;
  category: string;
  image: string;
};

export type Order = {
  payment?: 'card' | 'cash';
  address?: string;
  email?: string;
  phone?: string;
  items?: string[];
  total: number;
};

export type AppState = {
  catalog: Product[];
  basket: Product[];
  preview: Product | null;
  order: Order;
};

export type ApiListResponse<T> = {
    total: number,
    items: T[]
};
