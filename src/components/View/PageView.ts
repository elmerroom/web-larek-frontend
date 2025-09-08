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
  protected events: IEvents;
  protected _wrapper: HTMLElement;


  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events

    this.productGallery = ensureElement('.gallery', this.container);
    this.basket = ensureElement('.header__basket', this.container) as HTMLButtonElement;
    this.basketCount = ensureElement('.header__basket-counter', this.container);
    this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
    
    this.basket.addEventListener('click', () => {
      this.events.emit('basketModal:open')
      this.events.emit('productModal:preview', {preview: false})
    })
  }

  set productList(items: HTMLElement[]) {
    this.productGallery.replaceChildren(...items)
  }

  set count(value: number) {
    this.setText(this.basketCount, value)
  }

  set locked(value: boolean) {
        if (value) {
            this._wrapper.classList.add('page__wrapper_locked');
        } else {
            this._wrapper.classList.remove('page__wrapper_locked');
        }
    }

}