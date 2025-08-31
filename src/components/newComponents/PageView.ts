import { Product } from "../../types";
import { CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IPageView {
  productList: HTMLElement[];
  count: number;
}


export class PageView extends Component<IPageView> {

  protected productGallery: HTMLElement;
  protected basket: HTMLButtonElement;
  protected basketCount: HTMLSpanElement;
  // protected item: HTMLButtonElement;
  protected events: IEvents
  // protected itemTitle: HTMLElement;
  // protected itemPrice: HTMLElement;
  // protected itemImg: HTMLImageElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events

    this.productGallery = ensureElement('.gallery', this.container);
    this.basket = ensureElement('.header__basket', this.container) as HTMLButtonElement;
    this.basketCount = ensureElement('.header__basket-counter', this.container);
    
    this.basketCount.addEventListener('click', () => console.log('hi'))

    // this.itemCategory = ensureElement('.card__category', this.container);
    // this.itemTitle = ensureElement('.card__title', this.container);
    // this.itemPrice = ensureElement('.card__price', this.container);
    // this.itemImg = ensureElement('.card__image', this.container) as HTMLImageElement;
  }

  set productList(items: HTMLElement[]) {
    this.productGallery.replaceChildren(...items)
    // this.item = ensureElement('.gallery__item', this.container) as HTMLButtonElement;

    // this.item.addEventListener('click', () => this.events.emit('productModal:open'))
    // setTimeout(() => {
    //   this.item.addEventListener('click', () => console.log('hi'))
    // }, 2000);
    
    // this.productGallery.innerHTML = '';
    // items.forEach(item => this.productGallery.appendChild(item));
  }

  set count(value: number) {
    this.setText(this.basketCount, value)
  }

}