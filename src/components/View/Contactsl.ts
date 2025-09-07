import { ensureAllElements, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IContcts {
  valid: boolean;
}

export class Contacts extends Component<IContcts> {
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
      this.events.emit('contacts:input', {field, value})
    })

    this.container.addEventListener('submit', (event) => {
      event.preventDefault();
      this.events.emit('modal:close');
      this.events.emit('contacts:submit');
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
        this.errorElement.textContent = '';
        this.inputs.forEach((input) => {
          input.value = ''
        })
        this.setDisabled(this.submitButton, true);
    }
}