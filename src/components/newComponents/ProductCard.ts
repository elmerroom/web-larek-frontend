import { Product } from "../../types";
import { CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";


export class ProductCard extends Component<Product> {

  protected itemCategory: HTMLElement;
  protected itemTitle: HTMLElement;
  protected itemPrice: HTMLElement;
  protected itemImg: HTMLImageElement;

  constructor(container: HTMLElement) {
    super(container);
    this.itemCategory = ensureElement('.card__category', this.container);
    this.itemTitle = ensureElement('.card__title', this.container);
    this.itemPrice = ensureElement('.card__price', this.container);
    this.itemImg = ensureElement('.card__image', this.container) as HTMLImageElement;
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

  set title(value: string) {
    this.setText(this.itemTitle, value);
  }

  set price(value: string) {
    this.setText(this.itemPrice, value ? `${value} синапсов` : 'Бесценно');
  }

  set image(value: string) {
    this.setImage(this.itemImg, `${CDN_URL}${value}`
    )
  }

  // render(data: Partial<Product>): HTMLElement {
  //   Object.assign(this as object, data)
  //   return this.container
  // }
}