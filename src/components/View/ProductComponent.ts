import { IProduct } from "../../types";
import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { CDN_URL } from "../../utils/constants";

export abstract class ProductComponent extends Component<IProduct> {
  protected itemTitle: HTMLElement;
  protected itemPrice: HTMLElement;
  // protected itemCategory: HTMLElement;
  // protected itemImg: HTMLImageElement;

  constructor(container: HTMLElement, protected product: IProduct) {
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
}