import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface ISuccess {
  total: number
}

export class SuccessView extends Component<ISuccess> {
  private description: HTMLElement;
  private closeButton: HTMLButtonElement;
  private events: IEvents

  constructor(container: HTMLElement, events: IEvents) {
    super(container)
    this.events = events


    this.description = ensureElement<HTMLElement>('.order-success__description', this.container)

    this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

    this.closeButton.addEventListener('click', () => {
      this.events.emit('success:close')
    })
  }

  set total(number: number) {
    this.setText(this.description, `Списано ${number} синапсов`)
  }
}