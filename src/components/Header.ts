import { EventEmitter } from "./base/events";
import { ensureElement } from "../utils/utils";

export class Header {
   private basketButton: HTMLElement;
   private counterElement: HTMLElement;
   
  constructor(events: EventEmitter) {
    this.basketButton = ensureElement<HTMLElement>('.header__basket');
    this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', this.basketButton);
    this.basketButton.addEventListener('click', () => {
      events.emit('basket:open');
    });
  }

  setCounter(value: number) {
        this.counterElement.textContent = String(value);
    }
}