import { Product } from "../../types";
import { CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IPageView {
  productList: HTMLElement[];
  count: number;
}


export class PageView extends Component<IPageView> {

  protected productGallery: HTMLElement;
  protected basket: HTMLButtonElement;
  protected basketCount: HTMLSpanElement;
  // protected itemTitle: HTMLElement;
  // protected itemPrice: HTMLElement;
  // protected itemImg: HTMLImageElement;

  constructor(container: HTMLElement) {
    super(container);

    this.productGallery = ensureElement('.gallery', this.container);
    this.basket = ensureElement('.header__basket', this.container) as HTMLButtonElement;
    this.basketCount = ensureElement('.header__basket-counter', this.container);
    // this.itemCategory = ensureElement('.card__category', this.container);
    // this.itemTitle = ensureElement('.card__title', this.container);
    // this.itemPrice = ensureElement('.card__price', this.container);
    // this.itemImg = ensureElement('.card__image', this.container) as HTMLImageElement;
  }

  set productList(items: HTMLElement[]) {
    this.productGallery.replaceChildren(...items)
    // this.productGallery.innerHTML = '';
    // items.forEach(item => this.productGallery.appendChild(item));
  }

  set count(value: number) {
    this.setText(this.basketCount, value)
  }

}