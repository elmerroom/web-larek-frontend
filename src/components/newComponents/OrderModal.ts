import { ensureAllElements, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IDataOrder {
    data: HTMLElement
}

export class OrderModal extends Component<IDataOrder> {
    protected events: IEvents;
    protected _form: HTMLFormElement;
    protected paymentButtons: HTMLButtonElement[];
    protected submitButton: HTMLButtonElement;
    protected addressInput: HTMLInputElement;
    protected errorElement: HTMLElement;
    protected selectedPayment: 'card' | 'cash';

  constructor(container: HTMLElement, events: IEvents) {
          super(container);
          this.events = events;
          
        this._form = ensureElement<HTMLFormElement>('.order', this.container)
        this.paymentButtons = ensureAllElements<HTMLButtonElement>('.button_alt', this.container)
        this.submitButton = ensureElement<HTMLButtonElement>('.order__button', this.container)
        this.addressInput = ensureElement<HTMLInputElement>('.form__input', this.container)
        this.errorElement = ensureElement<HTMLElement>('.form__errors', this.container)

        this.paymentButtons.forEach((button, index, array) => {
           
            button.addEventListener('click', () => {
            // if(button.name === 'cash') {
            //     array[1].classList.add('button_alt-active')
            //     array[0].classList.remove('button_alt-active')
            // } else {
            //     array[0].classList.add('button_alt-active')
            //     array[1].classList.remove('button_alt-active')
            // }

            switch (button.name) {
                case 'cash':
                    array[1].classList.add('button_alt-active')
                    array[0].classList.remove('button_alt-active')
                break;
                case 'card':
                    array[0].classList.add('button_alt-active')
                    array[1].classList.remove('button_alt-active')
                break;
            }

            // this.events.on("order:payCategory", data)
                
        })
           
           
        })
        
        
      }

      protected paymentBut() {
        this.paymentButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                button.classList.add('button_alt-active')
            })
        })
        // button_alt-active
      }

      private validateForm(): void {
        if (!this.submitButton || !this.addressInput) return;

        const isAddressValid = this.addressInput.value.trim().length > 0;
        const isPaymentSelected = this.selectedPayment !== null;
        
        if (!isPaymentSelected) {
            this.showError('Выберите способ оплаты');
            return;
        }

        if (!isAddressValid) {
            this.showError('Введите адрес доставки');
            return;
        }

        this.hideError();
        super.setDisabled(this.submitButton, true)
    }


     private showError(message: string): void {
        if (this.errorElement) {
            this.errorElement.textContent = message;
        }
        if (this.submitButton) {
            this.submitButton.disabled = true;
        }
    }

    private hideError(): void {
        if (this.errorElement) {
            this.errorElement.textContent = '';
        }
    }

    //   createOrderModal() {
        
    //     // this.form = ensureElement<HTMLFormElement>()

    //     return this.container
    //   }

}