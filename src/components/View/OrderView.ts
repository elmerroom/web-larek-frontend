import { IOrderView } from "../../types";
import { IEvents } from "../base/events";
import { Form } from "../Common/Form";

export class OrderView extends Form<IOrderView> {
    protected paymentButtons: NodeListOf<HTMLButtonElement>;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this.paymentButtons =  this.container.querySelectorAll('.button_alt');

        this.paymentButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const payment = button.name as IOrderView['payment'];
                this.events.emit('payment:select', { payment });
            });
        });
    }

    set payment(value: IOrderView['payment']) {
        this.paymentButtons.forEach((button) => {
            button.classList.remove('button_alt-active');
        });
        if (value) {
            const selectedButton = Array.from(this.paymentButtons).find(button => button.name === value);
            if (selectedButton) {
                selectedButton.classList.add('button_alt-active');
            }
        }
    }

    set address(value: string) {
        const input = this.container.querySelector('input[name="address"]') as HTMLInputElement;
        input.value = value;
    }
}