import { Order } from "../../types";
import { ensureAllElements, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IDataOrder {
    validData: boolean;
    validButton: boolean;
}

export class OrderView extends Component<IDataOrder> {
    protected events: IEvents;
    protected _form: HTMLFormElement;
    protected paymentButtons: HTMLButtonElement[];
    protected submitButton: HTMLButtonElement;
    protected addressInput: HTMLInputElement;
    protected errorElement: HTMLElement;
    protected selectedPayment: 'card' | 'cash' | null;
    protected _validData: boolean;
    protected _validButton: boolean ;

  constructor(container: HTMLElement, events: IEvents) {
          super(container);
          this.events = events;

          this._validData = false;
          this._validButton = false;
          
        this._form = this.container.querySelector('.form') as HTMLFormElement
        this.paymentButtons = ensureAllElements<HTMLButtonElement>('.button_alt', this.container)
        this.submitButton = ensureElement<HTMLButtonElement>('.order__button', this.container)
        this.addressInput = ensureElement<HTMLInputElement>('.form__input', this.container)
        this.errorElement = ensureElement<HTMLElement>('.form__errors', this.container)
        

        this.paymentButtons.forEach((button, index, array) => {
           
            button.addEventListener('click', (event) => {
        
            const target = event.target as HTMLButtonElement;
            const targerName = {
              name:  target.name
            }
            this.events.emit("order:payCategory", targerName)
            this.events.emit('validate:inspect', this.addressInput)
        })

           this.events.on('order:change:button', (item: Order) => {
                 switch (item.payment) {
                case 'cash':
                    array[1].classList.add('button_alt-active')
                    array[0].classList.remove('button_alt-active')
                break;
                case 'card':
                    array[0].classList.add('button_alt-active')
                    array[1].classList.remove('button_alt-active')
                break;
            }

            this.selectedPayment = item.payment
            })
           
        })
        
         this.addressInput.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            this.events.emit('validate:inspect', target);
            this.events.emit('validateButton:inspect');
        });

            this.submitButton.addEventListener('click', (event) => {
            const orderData = {
                adress: this.addressInput.value.trim()
            }
            event.preventDefault()
            this.events.emit('modal:close');
            this.events.emit('order:submit', orderData)
            this.events.emit("form:reset", this.container)
        })
        
      }

    set validData(value: boolean) {
        this._validData = value;
        this._validateForm();
    }

    set validButton(value: boolean) {
        this._validButton = value;
        this._validateForm();  
    }


    private _validateForm(): void {
    if (!this._validData) {
        this.showError('Введите адрес доставки');
        super.setDisabled(this.submitButton, true);
        return;
    }

    if (!this._validButton) {
        this.showError('Выберите способ оплаты');
        super.setDisabled(this.submitButton, true);
        return;
    }

    this.hideError();
    super.setDisabled(this.submitButton, false);
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
   
    closeOrderModal() {
        this.addressInput.value = ''
        this.errorElement.textContent = '';
        this.paymentButtons.forEach((button) => {
            button.classList.remove('button_alt-active')
        })
        super.setDisabled(this.submitButton, true)
    }
}