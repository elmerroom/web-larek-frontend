import { Product } from "../../types";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class ContactsModal extends Component<Product> {
   protected events: IEvents;
   private form: HTMLFormElement;
    private submitButton: HTMLButtonElement;
    private emailInput: HTMLInputElement;
    private phoneInput: HTMLInputElement;
    private errorElement: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;

  }
}