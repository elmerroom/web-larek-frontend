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
  protected events: IEvents


  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events

    this.productGallery = ensureElement('.gallery', this.container);
    this.basket = ensureElement('.header__basket', this.container) as HTMLButtonElement;
    this.basketCount = ensureElement('.header__basket-counter', this.container);
    
    this.basket.addEventListener('click', () => this.events.emit('basketModal:open'))
  }

  set productList(items: HTMLElement[]) {
    this.productGallery.replaceChildren(...items)
  }

  set count(value: number) {
    this.setText(this.basketCount, value)
  }

}