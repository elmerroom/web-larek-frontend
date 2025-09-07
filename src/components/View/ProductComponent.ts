import { Product } from "../../types";
import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { CDN_URL } from "../../utils/constants";

export abstract class ProductComponent extends Component<Product> {
  protected itemTitle: HTMLElement;
  protected itemPrice: HTMLElement;
  // protected itemCategory: HTMLElement;
  // protected itemImg: HTMLImageElement;

  constructor(container: HTMLElement, protected product: Product) {
    super(container);
    this.itemTitle = ensureElement<HTMLElement>('.card__title', this.container);
    this.itemPrice = ensureElement<HTMLElement>('.card__price', this.container);
    // this.itemCategory = ensureElement<HTMLElement>('.card__category', this.container);
    // this.itemImg = ensureElement<HTMLImageElement>('.card__image', this.container);
  }

  set title(value: string) {
    this.setText(this.itemTitle, value);
  }

  set price(value: number | null) {
    this.setText(this.itemPrice, value ? `${value} синапсов` : 'Бесценно');
  }

  // set category(value: string) {
  //   this.setText(this.itemCategory, value);
  //   this.itemCategory.classList.remove('card__category_soft', 'card__category_other');
  //   switch (value) {
  //     case 'хард-скил':
  //       this.itemCategory.classList.add('card__category_hard');
  //       break;
  //     case 'софт-скил':
  //       this.itemCategory.classList.add('card__category_soft');
  //       break;
  //     case 'дополнительное':
  //       this.itemCategory.classList.add('card__category_additional');
  //       break;
  //     case 'кнопка':
  //       this.itemCategory.classList.add('card__category_button');
  //       break;
  //     default:
  //       this.itemCategory.classList.add('card__category_other');
  //   }
  // }

  // set image(value: string) {
  //   this.setImage(this.itemImg, `${CDN_URL}${value}`);
  // }
}