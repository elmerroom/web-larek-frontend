import { Product } from "../../types";
import { cloneTemplate, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";


// export class BasketModal extends Component<Product> {

//   private basketTemplate: HTMLTemplateElement;

//   constructor(container?: HTMLElement) {
//     super(container)

//     this.basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
//   }

//   createBasketModal(basketItems: Product[]) {
//     const content = cloneTemplate(this.basketTemplate);

//     const basketList = ensureElement<HTMLUListElement>('.basket__list', content);

//     const busketButton = ensureElement<HTMLButtonElement>('.basket__button', content);

//     const totalPrice = ensureElement<HTMLElement>('.basket__price', content)
    
//     const emptyMessage = this.createEmptyMessage()

//     if (basketItems.length === 0) {
//           basketList.appendChild(emptyMessage);
//           super.setDisabled(busketButton, true)
//           totalPrice.textContent = '0 синапсов';
//         } else {
//           busketButton.removeAttribute('disabled');
//       totalPrice.textContent = `${basketItems.reduce((sum, item) => sum + (item.price || 0), 0)} синапсов`;
//     }
    

//     return content
//   }
        
//    private createEmptyMessage(): HTMLElement {
//     const message = document.createElement('span');
//     message.classList.add('basket__empty');
//     message.textContent = 'Корзина пуста';
//     return message;
//   }

//   // set productList(items: HTMLElement[]) {
//   //   this.productGallery.replaceChildren(...items)
//   // }

//   // set count(value: number) {
//   //   this.setText(this.basketCount, value)
//   // }

// }

interface IBasketModal {
  basketListItem: HTMLElement[];
  orderTotalPrice: number;
}


export class BasketModal extends Component<IBasketModal> {

  // private basketTemplate: HTMLTemplateElement;
  protected basketList: HTMLUListElement;
  protected busketButton: HTMLButtonElement;
  protected totalPrice: HTMLElement;
  protected events: IEvents
  
  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events
     this.basketList = ensureElement<HTMLUListElement>('.basket__list', this.container);

    this.busketButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);

    this.totalPrice = ensureElement<HTMLElement>('.basket__price', this.container)
  }

  createBasketModal(basketItems: Product[]) {
    const emptyMessage = this.createEmptyMessage()

    if (basketItems.length === 0) {
          this.basketList.appendChild(emptyMessage);
          super.setDisabled(this.busketButton, true)
          this.totalPrice.textContent = '0 синапсов';
        } else {
          
          this.busketButton.removeAttribute('disabled');
          this.busketButton.addEventListener('click', () => {
            // this.events.emit('modal:close');
            this.events.emit('orderModal:open')
          })
      // this.totalPrice.textContent = `${basketItems.reduce((sum, item) => sum + (item.price || 0), 0)} синапсов`;
    }
    

    return this.container
  }
        
   private createEmptyMessage(): HTMLElement {
    const message = document.createElement('span');
    message.classList.add('basket__empty');
    message.textContent = 'Корзина пуста';
    return message;
  }

  set basketListItem(items: HTMLElement[]) {
    this.basketList.replaceChildren(...items)
  }

  set orderTotalPrice(value: number) {
    this.setText(this.totalPrice, `${value} синапсов`)
  }

  // set count(value: number) {
  //   this.setText(this.basketCount, value)
  // }

}