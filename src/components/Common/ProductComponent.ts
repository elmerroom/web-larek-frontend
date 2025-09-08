import { IProduct } from "../../types";
import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

export abstract class ProductComponent extends Component<IProduct> {
  protected itemTitle: HTMLElement;
  protected itemPrice: HTMLElement;

  constructor(container: HTMLElement, protected product: IProduct) {
    super(container);
    this.itemTitle = ensureElement<HTMLElement>('.card__title', this.container);
    this.itemPrice = ensureElement<HTMLElement>('.card__price', this.container);
  }

  set title(value: string) {
    this.setText(this.itemTitle, value);
  }

  set price(value: number | null) {
    this.setText(this.itemPrice, value ? `${value} синапсов` : 'Бесценно');
  }

  protected switchCaregory(content: HTMLElement, category: string) {
    switch (category) { 
        case 'хард-скил': 
          content.classList.add('card__category_hard'); 
          break; 
        case 'софт-скил': 
          content.classList.add('card__category_soft'); 
          break; 
        case 'дополнительное': 
          content.classList.add('card__category_additional'); 
          break; 
        case 'кнопка': 
          content.classList.add('card__category_button'); 
          break; 
        default: 
          content.classList.add('card__category_other'); 
      } 

  }
}