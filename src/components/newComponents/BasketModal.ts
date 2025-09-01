import { Product } from "../../types";
import { cloneTemplate, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";


export class BasketModal extends Component<Product> {

  private basketTemplate: HTMLTemplateElement;

  constructor(container?: HTMLElement) {
    super(container)

    this.basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
  }

  createBasketModal(basketItems: Product[]) {
    const content = cloneTemplate(this.basketTemplate);

    const basketList = ensureElement<HTMLUListElement>('.basket__list', content);

    const busketButton = ensureElement<HTMLButtonElement>('.basket__button', content);

    const totalPrice = ensureElement<HTMLElement>('.basket__price', content)
    
    const emptyMessage = this.createEmptyMessage()

    if (basketItems.length === 0) {
          basketList.appendChild(emptyMessage);
          super.setDisabled(busketButton, true)
          totalPrice.textContent = '0 синапсов';
        } else {
          busketButton.removeAttribute('disabled');
      totalPrice.textContent = `${basketItems.reduce((sum, item) => sum + (item.price || 0), 0)} синапсов`;
    }

    return content
  }
        
   private createEmptyMessage(): HTMLElement {
    const message = document.createElement('span');
    message.classList.add('basket__empty');
    message.textContent = 'Корзина пуста';
    return message;
  }

}