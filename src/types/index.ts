export interface IProduct   {
  id: string;
  title: string;
  description: string;
  price: number | null;
  category: string;
  image: string;
};

export interface IOrder  {
  payment?: 'card' | 'cash' | null;
  address?: string;
  email?: string;
  phone?: string;
  items?: string[];
  total?: number;
};

export interface ApiListResponse<T>  {
    total: number;
    items: T[]
};

export interface IOrderForm {
    payment?: 'card' | 'cash';
    address?: string;
    email?: string;
    phone?: string;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IAppState  {
  catalog: IProduct[];
  basket: IProduct[];
  preview: IProduct | null;
  order: IOrder;
  formErrors: FormErrors;
};

export interface IOrderView {
    payment: IOrder['payment'];
    address: string;
}

export interface IContacts {
    email: string;
    phone: string;
}

//  export type SuccessOrder = {
    
//   }
export interface IProductPreview extends IProduct {
  inBasket: boolean
}

export interface IApiMethods {
  get<T>(uri: string): Promise<T>;
  post<T>(uri: string, data: object, method: string): Promise<T>;
}