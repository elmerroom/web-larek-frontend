import { IProduct } from "../../types";
import { CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { ProductComponent } from "../Common/ProductComponent";


export class ProductCard extends ProductComponent {

  protected itemCategory: HTMLElement;
  protected itemImg: HTMLImageElement;
  protected events: IEvents;

  constructor(container: HTMLElement, events: IEvents, product: IProduct) {
    super(container, product);
    this.events = events;
    this.itemCategory = ensureElement('.card__category', this.container);
    this.itemImg = ensureElement('.card__image', this.container) as HTMLImageElement;

    this.container.addEventListener('click', () => {
      this.events.emit('productModal:preview', {preview: true});
      this.events.emit('productModal:render', product)
    })
  }

  set category(value: string) {
    this.setText(this.itemCategory, value);

    this.itemCategory.classList.remove('card__category_soft');

    this.switchCaregory(this.itemCategory, value)
  };

  set image(value: string) {
    this.setImage(this.itemImg, `${CDN_URL}${value}`
    )
  }
}