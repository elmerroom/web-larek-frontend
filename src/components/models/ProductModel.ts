// import { IEvents } from '../base/events';
// import { IProduct, IAppState, IOrder, FormErrors, IOrderForm} from '../../types/index';



// export class ProductModel {
//   state: IAppState = {
//   catalog: [],
//   basket: [],
//   preview: null,
//   order: {
//     payment:  undefined,
//     address: null,
//     email: undefined,
//     phone: undefined,
//     // items: [],
//     // total: 0
//   },
//   formErrors: {}
// };
//   protected products: IProduct[] = []

//   constructor(protected events: IEvents) {   
//     this.events = events;
//   }

//   addToBasket(product: IProduct): IProduct[] {
//     if (!this.state.basket.some(item => item.id === product.id)) {
//       this.state.basket.push(product);
//     }
//     this.events.emit('basket:changed')

//     // this.state.order.items = this.state.basket.map(product => product.id)
//     return this.state.basket
//   }

//   removeFromBasket(productId: string) {
//     this.state.basket = this.state.basket.filter(item => item.id !== productId);
//     this.events.emit('basket:changed');
//     // this.state.order.items = this.state.basket.map(product => product.id)
//   }

//   getProducts(): IProduct[] {
//     return this.state.catalog
//   }

//   getProduct(id: string): IProduct {
//     return this.state.catalog.find(item => item.id === id)
//   }

//   getTotal() {
//     return this.state.basket.length
//   }

//   updateOrderTotal(): number {
//     return this.state.basket.reduce(
//         (sum, item) => sum + (item.price || 0), 0
//     );
//   }

//   clearBasket() {
//     this.events.emit('basket:changed')
//     this.state.basket = [];
//   }

//   clearOrder() {
//     this.state.order = {
//       payment:  undefined,
//     address: null,
//     email: undefined,
//     phone: undefined,
//     }
//     this.state.formErrors = {};
//   }

 

//   successOrder(): IOrder {
//     const order = this.state.order
//     order.total = this.state.basket.reduce(
//         (sum, item) => sum + (item.price || 0), 0
//     );
//     order.items = this.state.basket.map(product => product.id)
//     return order
//   }

//   setProducts(products: IProduct[]) {
//     this.state.catalog = products
//     this.events.emit('product:changed')
//   }

//   getBasket(): IProduct[] {
//     return this.state.basket
//   };

//   getOrder(): IOrder {
//     return this.state.order
//   }

//   setOrderField(field: keyof IOrderForm, value: string | 'card' | 'cash') {
//        (this.state.order[field] as any) = value;
//         this.validateField(field as keyof IOrder);

//         if (Object.keys(this.state.formErrors).length === 0) {
//             this.events.emit('order:ready', this.state.order);
//         }
//     }

//   private validateField(field: keyof IOrder) {
//         const errors: FormErrors = { ...this.state.formErrors };
//         delete errors[field];

//         switch (field) {
//             case 'payment':
//                 if (!this.state.order.payment) {
//                     errors.payment = 'Не выбран способ оплаты';
//                 }
//                 break;
//             case 'address':
//                 if (!this.state.order.address || this.state.order.address.trim().length === 0) {
//                     errors.address = 'Необходимо указать адрес';
//                 }
//                 break;
//             case 'email':
//                 if (!this.state.order.email || this.state.order.email.trim().length === 0) {
//                     errors.email = 'Необходимо указать email';
//                 }
//                 break;
//             case 'phone':
//                 if (!this.state.order.phone || this.state.order.phone.trim().length === 0) {
//                     errors.phone = 'Необходимо указать телефон';
//                 }
//                 break;
//         }

//         this.state.formErrors = errors;
//         this.events.emit('formErrors:change', this.state.formErrors);
//     }

//     get orderValid(): boolean {
//     const errors = this.state.formErrors;
//     return !errors.payment && !errors.address;
//   }

//   get contactsValid(): boolean {
//     const errors = this.state.formErrors;
//     return !errors.email && !errors.phone;
//   }

//   getOrderErrors(): string[] {
//     const errors = this.state.formErrors;
//     const errs: string[] = [];
//     if (errors.payment) errs.push(errors.payment);
//     if (errors.address) errs.push(errors.address);
//     return errs;
//   }

//   getContactsErrors(): string[] {
//     const errors = this.state.formErrors;
//     const errs: string[] = [];
//     if (errors.email) errs.push(errors.email);
//     if (errors.phone) errs.push(errors.phone);
//     return errs;
//   }

//   setPaymentValue(value: 'cash' | 'card') {
//     this.setOrderField('payment', value);
//   }

//   isInBasket(productId: string): boolean {
//     return this.state.basket.some(item => item.id === productId);
//   }
// }



import { IEvents } from '../base/events';
import { IProduct, IAppState, IOrder, FormErrors, IOrderForm} from '../../types/index';



export class ProductModel {
  state: IAppState = {
  catalog: [],
  basket: [],
  preview: null,
  order: {
    payment:  undefined,
    address: null,
    email: undefined,
    phone: undefined,
  },
  formErrors: {}
};
  protected products: IProduct[] = []

  constructor(protected events: IEvents) {   
    this.events = events;
  }

  addToBasket(product: IProduct): IProduct[] {
    if (!this.state.basket.some(item => item.id === product.id)) {
      this.state.basket.push(product);
    }
    this.events.emit('basket:changed')

    return this.state.basket
  }

  removeFromBasket(productId: string) {
    this.state.basket = this.state.basket.filter(item => item.id !== productId);
    this.events.emit('basket:changed');
  }

  getProducts(): IProduct[] {
    return this.state.catalog
  }

  getProduct(id: string): IProduct {
    return this.state.catalog.find(item => item.id === id)
  }

  getTotal() {
    return this.state.basket.length
  }

  updateOrderTotal(): number {
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
    };
    this.state.formErrors = {};
  }

  successOrder(): IOrder {
    const order = this.state.order
    order.total = this.state.basket.reduce(
        (sum, item) => sum + (item.price || 0), 0
    );
    order.items = this.state.basket.map(product => product.id)
    return order
  }

  setProducts(products: IProduct[]) {
    this.state.catalog = products
    this.events.emit('product:changed')
  }

  getBasket(): IProduct[] {
    return this.state.basket
  };

  getOrder(): IOrder {
    return this.state.order
  }

  setOrderField(field: keyof IOrderForm, value: string | 'card' | 'cash') {
        (this.state.order[field] as any) = value;
        this.validateField(field as keyof IOrder);

        if (Object.keys(this.state.formErrors).length === 0) {
            this.events.emit('order:ready', this.state.order);
        }
    }

  private validateField(field: keyof IOrder) {
        const errors: FormErrors = { ...this.state.formErrors };
        delete errors[field];

        switch (field) {
            case 'payment':
                if (!this.state.order.payment) {
                    errors.payment = 'Не выбран способ оплаты';
                }
                break;
            case 'address':
                if (!this.state.order.address || this.state.order.address.trim().length === 0) {
                    errors.address = 'Необходимо указать адрес';
                }
                break;
            case 'email':
                if (!this.state.order.email || this.state.order.email.trim().length === 0) {
                    errors.email = 'Необходимо указать email';
                }
                break;
            case 'phone':
                if (!this.state.order.phone || this.state.order.phone.trim().length === 0) {
                    errors.phone = 'Необходимо указать телефон';
                }
                break;
        }

        this.state.formErrors = errors;
        this.events.emit('formErrors:change', this.state.formErrors);
    }

  validateOrderForm() {
    this.validateField('payment');
    this.validateField('address');
  }

  validateContactsForm() {
    this.validateField('email');
    this.validateField('phone');
  }

  get orderValid(): boolean {
    const errors = this.state.formErrors;
    return !errors.payment && !errors.address;
  }

  get contactsValid(): boolean {
    const errors = this.state.formErrors;
    return !errors.email && !errors.phone;
  }

  getOrderErrors(): string[] {
    const errors = this.state.formErrors;
    const errs: string[] = [];
    if (errors.payment) errs.push(errors.payment);
    if (errors.address) errs.push(errors.address);
    return errs;
  }

  getContactsErrors(): string[] {
    const errors = this.state.formErrors;
    const errs: string[] = [];
    if (errors.email) errs.push(errors.email);
    if (errors.phone) errs.push(errors.phone);
    return errs;
  }

  setPaymentValue(value: 'cash' | 'card') {
    this.setOrderField('payment', value);
  }

  isInBasket(productId: string): boolean {
    return this.state.basket.some(item => item.id === productId);
  }
}