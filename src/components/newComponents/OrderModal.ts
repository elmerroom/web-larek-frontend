import { Order } from "../../types";
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
    protected selectedPayment: 'card' | 'cash' | null;

  constructor(container: HTMLElement, events: IEvents) {
          super(container);
          this.events = events;
          
        this._form = ensureElement<HTMLFormElement>('.order', this.container)
        this.paymentButtons = ensureAllElements<HTMLButtonElement>('.button_alt', this.container)
        this.submitButton = ensureElement<HTMLButtonElement>('.order__button', this.container)
        this.addressInput = ensureElement<HTMLInputElement>('.form__input', this.container)
        this.errorElement = ensureElement<HTMLElement>('.form__errors', this.container)
        

        this.paymentButtons.forEach((button, index, array) => {
           
            button.addEventListener('click', (event) => {
        
            const target = event.target as HTMLButtonElement;
            const targerName = target.name
            this.events.emit("order:payCategory", {targerName})
            this.validateForm();
            
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
        
         this.addressInput.addEventListener('input', () => {
            this.validateForm();
        });

            this.submitButton.addEventListener('click', (event) => {
            const orderData = {
                adress: this.addressInput.value.trim()
            }
            event.preventDefault()
            this.events.emit('modal:close');
            this.events.emit('order:submit', orderData)
        })
        
      }

    //   protected paymentBut() {
    //     this.paymentButtons.forEach((button, index) => {
    //         button.addEventListener('click', () => {
    //             button.classList.add('button_alt-active')
    //         })
    //     })
    //     // button_alt-active
    //   }

    private showError(message: string): void {
        if (this.errorElement) {
            this.errorElement.textContent = message;
        }
        if (this.submitButton) {
            super.setDisabled(this.submitButton, true)
            // this.submitButton.disabled = true;
        }
    }

    private hideError(): void {
        if (this.errorElement) {
            this.errorElement.textContent = '';
        }

        super.setDisabled(this.submitButton, false)
    }

      private validateForm(): void {
       
        // this.events.emit('validate:inspect', this.addressInput);
        // this.events.emit('validateButton:inspect', this.paymentButtons)
        const isAddressValid = this.addressInput.value.trim().length > 0;
        const isPaymentSelected = this.selectedPayment !== undefined;
        // console.log(isAddressValid)
        console.log(this.selectedPayment)
        if (!isPaymentSelected) {
            this.showError('Выберите способ оплаты');
            return;
        }

        // this.events.on('text:noValid', () => {
        //     this.showError('Введите адрес доставки');
        //     console.log('hi')
        //     // return;
        // })

        // this.events.on('button:noValid', () => {
        //     this.showError('Выберите способ оплаты');
        //     console.log('hi2')
        //     // return;
        // })

        // this.events.on('button:Valid', () => {
        //     console.log('hi3')
        //     // return
        // })

        //   this.events.on('text:valid', () => {
        //     console.log('hi4')
        //     // return
        // })

        if (!isAddressValid) {
            this.showError('Введите адрес доставки');
            return;
        }

        this.hideError();
        // super.setDisabled(this.submitButton, true)
    }


     

    closeOrderModal() {
         this.addressInput.value = ''
            this.errorElement.textContent = '';
            this.paymentButtons.forEach((button) => {
                button.classList.remove('button_alt-active')
            })
    }
}