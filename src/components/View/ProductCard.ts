import { IProduct } from "../../types";
import { CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";
import { ProductComponent } from "./ProductComponent";


export class ProductCard extends ProductComponent {

  protected itemCategory: HTMLElement;
  // protected itemTitle: HTMLElement;
  // protected itemPrice: HTMLElement;
  protected itemImg: HTMLImageElement;
  protected events: IEvents;
  // protected product: Product;

  constructor(container: HTMLElement, events: IEvents, product: IProduct) {
    super(container, product);
    this.events = events;
    // this.product = product
    this.itemCategory = ensureElement('.card__category', this.container);
    // this.itemTitle = ensureElement('.card__title', this.container);
    // this.itemPrice = ensureElement('.card__price', this.container);
    this.itemImg = ensureElement('.card__image', this.container) as HTMLImageElement;

    this.container.addEventListener('click', () => {
      this.events.emit('productModal:open',  this.product);
      console.log(this.product)
    })
  }

  set category(value: string) {
    this.setText(this.itemCategory, value);

    this.itemCategory.classList.remove('card__category_soft');

    switch (value) {
        case 'хард-скил':
          this.itemCategory.classList.add('card__category_hard');
          break;
        case 'софт-скил':
          this.itemCategory.classList.add('card__category_soft');
          break;
        case 'дополнительное':
          this.itemCategory.classList.add('card__category_additional');
          break;
        case 'кнопка':
          this.itemCategory.classList.add('card__category_button');
          break;
        default:
          this.itemCategory.classList.add('card__category_other');
      }
  };

  // set title(value: string) {
  //   this.setText(this.itemTitle, value);
  // }

  // set price(value: string) {
  //   this.setText(this.itemPrice, value ? `${value} синапсов` : 'Бесценно');
  // }

  set image(value: string) {
    this.setImage(this.itemImg, `${CDN_URL}${value}`
    )
  }
}