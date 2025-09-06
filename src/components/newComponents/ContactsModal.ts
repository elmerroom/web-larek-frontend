import { Product } from "../../types";
import { ensureAllElements, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IContctsModal {
  // validEmail: boolean;
  // validPhone: boolean;
  // inputValues: Record<string, string>;
  valid: boolean;
}

export class ContactsModal extends Component<IContctsModal> {
   protected events: IEvents;
   protected form: HTMLFormElement;
    protected submitButton: HTMLButtonElement;
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;
    protected inputs: HTMLInputElement[];
    protected errorElement: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;

    this.inputs = ensureAllElements<HTMLInputElement>('.form__input', this.container);
    this.submitButton = ensureElement<HTMLButtonElement>('.button', this.container);
    this.errorElement = ensureElement<HTMLElement>('.form__errors', this.container);


    this.container.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const field = target.name;
      const value = target.value;
      console.log(target , field, value);
      this.events.emit('contacts:input', {field, value})
    })

    this.submitButton.addEventListener('submit', () => {
      this.events.emit('contacts:submit');
      this.events.emit('modal:close')
    })
  }

  set valid(value: boolean){
    if (!value) {
      this.showError('Одно из полей не заполнено')
    } else {
      this.hideError()
    }

    
  }

  private showError(message: string): void {
        if (this.errorElement) {
            this.errorElement.textContent = message;
            console.log(this.errorElement.textContent)
        }
        if (this.submitButton) {
            super.setDisabled(this.submitButton, true)
        }
    }

    private hideError(): void {
        if (this.errorElement) {
            this.errorElement.textContent = '';
        }

        super.setDisabled(this.submitButton, false)
    }

     closeContactsModal() {
        this.emailInput.value = ''
        this.errorElement.textContent = '';
        this.phoneInput.value = ''
            // this.paymentButtons.forEach((button) => {
            //     button.classList.remove('button_alt-active')
            // })
    }
}