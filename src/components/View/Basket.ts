import { Product } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IBasket {
  basketListItem: HTMLElement[];
  orderTotalPrice: number;
}


export class Basket extends Component<IBasket> {

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
            this.events.emit('orderModal:open')
          })
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
}