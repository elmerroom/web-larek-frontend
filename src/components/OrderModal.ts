import { EventEmitter } from './base/events';
import { ensureElement, cloneTemplate } from '../utils/utils';
import { Modal } from './Modal';
import { Component } from './base/Component';

interface IDataOrder {
    data: HTMLElement
}

export class OrderModal extends Component<IDataOrder> {
    protected events: EventEmitter;
    private form: HTMLFormElement | null = null;
    private paymentButtons: HTMLButtonElement[] = [];
    private submitButton: HTMLButtonElement | null = null;
    private addressInput: HTMLInputElement | null = null;
    private errorElement: HTMLElement | null = null;
    private selectedPayment: 'card' | 'cash' | null = null;
    private currentTemplate: HTMLElement | null = null; // ← Добавляем поле для хранения template

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container);
        this.events = events;
    }

    private initElements(template: HTMLElement): void {
        try {
            this.form = ensureElement<HTMLFormElement>('.form', template);
            this.paymentButtons = Array.from(this.form.querySelectorAll('.button_alt'));
            this.submitButton = ensureElement<HTMLButtonElement>('.order__button', this.form);
            this.addressInput = ensureElement<HTMLInputElement>('.form__input', this.form);
            this.errorElement = ensureElement<HTMLElement>('.form__errors', this.form);
        } catch (error) {
            console.error('Ошибка инициализации элемента:', error);
            throw error;
        }
    }

    private initEventListeners(): void {
        if (!this.form) {
            console.error('Элемент форма не найден');
            return;
        }

        this.paymentButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.setPaymentMethod(button.getAttribute('name') as 'card' | 'cash');
            });
        });

        this.addressInput?.addEventListener('input', () => {
            this.validateForm();
        });

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    private setPaymentMethod(method: 'card' | 'cash'): void {
        this.selectedPayment = method;
      
        this.paymentButtons.forEach(button => {
            button.classList.toggle(
                'button_alt-active', 
                button.getAttribute('name') === method
            );
        });

        this.validateForm();
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
        this.submitButton.disabled = false;
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

    private handleSubmit(): void {
        if (!this.selectedPayment || !this.addressInput) return;

       const orderData = {
        payment: this.selectedPayment, 
        address: this.addressInput.value.trim()
    };

    this.events.emit('order:submit', orderData);
    }

    // open(): void {
    //     const template = cloneTemplate<HTMLElement>('#order');
    //     // this.render(template);
        
    //     this.initElements();
    //     this.initEventListeners();
        
    //     if (this.addressInput) this.addressInput.value = '';
    //     this.selectedPayment = null;
    //     if (this.submitButton) this.submitButton.disabled = true;
    //     this.hideError();
        
    //     this.paymentButtons.forEach(button => {
    //         button.classList.remove('button_alt-active');
    //     });
        
    //     // super.open();
    // }

    render(): HTMLElement {
        const template = cloneTemplate<HTMLElement>('#order');
        this.currentTemplate = template; // или сохраняем template для работы
        this.initElements(template);
        this.initEventListeners();

        if (this.addressInput) this.addressInput.value = '';
        this.selectedPayment = null;
        if (this.submitButton) this.submitButton.disabled = true;
        this.hideError();
        
        this.paymentButtons.forEach(button => {
            button.classList.remove('button_alt-active');
        });
        return template;
    }
}