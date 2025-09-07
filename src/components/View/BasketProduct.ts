import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";
import { ProductComponent } from "./ProductComponent";

export class BasketProduct extends ProductComponent {

  protected events: IEvents;
  // protected product: Product;
  protected itemIndex: HTMLElement;
  // protected itemTitle: HTMLElement;
  // protected itemPrice: HTMLElement;
  protected delateButton: HTMLButtonElement;


  constructor(container: HTMLElement, events: IEvents, product: IProduct) {
    super(container, product);
    this.events = events;
    // this.product = product;
    this.itemIndex = ensureElement('.basket__item-index', this.container);
    // this.itemTitle = ensureElement('.card__title', this.container);
    // this.itemPrice = ensureElement('.card__price', this.container);
    this.delateButton = ensureElement('.basket__item-delete', this.container) as HTMLButtonElement;

    this.delateButton.addEventListener('click', () => this.events.emit('basket:removeProduct', product))
  }

  // set title(value: string) {
  //   this.setText(this.itemTitle, value)
  // }

  //  set price(value: string) {
  //   this.setText(this.itemPrice, `${value} синапсов`);
  // }

  set index(value: string) {
    this.setText(this.itemIndex, value)
  }
}