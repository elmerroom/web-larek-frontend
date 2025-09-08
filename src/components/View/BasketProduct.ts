import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { ProductComponent } from "../Common/ProductComponent";

export class BasketProduct extends ProductComponent {

  protected events: IEvents;
  protected itemIndex: HTMLElement;
  protected delateButton: HTMLButtonElement;


  constructor(container: HTMLElement, events: IEvents, product: IProduct) {
    super(container, product);
    this.events = events;
    this.itemIndex = ensureElement('.basket__item-index', this.container);
    this.delateButton = ensureElement('.basket__item-delete', this.container) as HTMLButtonElement;

    this.delateButton.addEventListener('click', () => {
      this.events.emit('basket:removeProduct', product);
      this.events.emit('basketModal:open', product)
    }
  )

  }

  set index(value: string) {
    this.setText(this.itemIndex, value)
  }
}