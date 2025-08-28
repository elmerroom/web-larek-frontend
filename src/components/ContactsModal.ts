// import { EventEmitter } from './base/events';
// import { ensureElement, cloneTemplate } from '../utils/utils';
// import { Modal } from './Modal';
// import { Component } from './base/Component';

// interface IContctsModal {
//     // initElements: void;
//     initEventListeners: void;
//     validateForm: void;
//     validateEmail: boolean;
//     showError: void;
//     hideError: void;
//     handleSubmit: void;
// }

// export class ContactsModal extends Component<IContctsModal> {
//     protected events: EventEmitter;
//     private form: HTMLFormElement | null = null;
//     private submitButton: HTMLButtonElement | null = null;
//     private emailInput: HTMLInputElement | null = null;
//     private phoneInput: HTMLInputElement | null = null;
//     private errorElement: HTMLElement | null = null;

//     constructor(container: HTMLElement, events: EventEmitter) {
//         super(container);
//         this.events = events;

//         this.form = ensureElement<HTMLFormElement>('.form', this.container);
//         this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.form);
//         this.emailInput = ensureElement<HTMLInputElement>('[name="email"]', this.form);
//         this.phoneInput = ensureElement<HTMLInputElement>('[name="phone"]', this.form);
//         this.errorElement = ensureElement<HTMLElement>('.form__errors', this.form);
//     }


//     set initEventListeners(): void {
//         if (!this.form) {
//             console.error('Form element not found');
//             return;
//         }

//         this.emailInput?.addEventListener('input', () => this.validateForm());
//         this.phoneInput?.addEventListener('input', () => this.validateForm());

//         this.form.addEventListener('submit', (e) => {
//             e.preventDefault();
//             this.handleSubmit();
//         });
//     }

//     // private initElements(): void {
//     //     try {
//     //         this.form = ensureElement<HTMLFormElement>('.form', this.container);
//     //         this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.form);
//     //         this.emailInput = ensureElement<HTMLInputElement>('[name="email"]', this.form);
//     //         this.phoneInput = ensureElement<HTMLInputElement>('[name="phone"]', this.form);
//     //         this.errorElement = ensureElement<HTMLElement>('.form__errors', this.form);
//     //     } catch (error) {
//     //         console.error('Error initializing form elements:', error);
//     //         throw error;
//     //     }
//     // }

//     // private initEventListeners(): void {
//     //     if (!this.form) {
//     //         console.error('Form element not found');
//     //         return;
//     //     }

//     //     this.emailInput?.addEventListener('input', () => this.validateForm());
//     //     this.phoneInput?.addEventListener('input', () => this.validateForm());

//     //     this.form.addEventListener('submit', (e) => {
//     //         e.preventDefault();
//     //         this.handleSubmit();
//     //     });
//     // }

//     // private validateForm(): void {
//     //     if (!this.submitButton || !this.emailInput || !this.phoneInput) return;

//     //     const isEmailValid = this.validateEmail(this.emailInput.value);
//     //     const isPhoneValid = this.phoneInput.value.trim().length > 0;

//     //     if (!isEmailValid) {
//     //         this.showError('Введите корректный email');
//     //         return;
//     //     }

//     //     if (!isPhoneValid) {
//     //         this.showError('Введите телефон');
//     //         return;
//     //     }

//     //     this.hideError();
//     //     this.submitButton.disabled = false;
//     // }

//     // private validateEmail(email: string): boolean {
//     //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     // }

//     // private showError(message: string): void {
//     //     if (this.errorElement) {
//     //         this.errorElement.textContent = message;
//     //     }
//     //     if (this.submitButton) {
//     //         this.submitButton.disabled = true;
//     //     }
//     // }

//     // private hideError(): void {
//     //     if (this.errorElement) {
//     //         this.errorElement.textContent = '';
//     //     }
//     // }

//     // private handleSubmit(): void {
//     //     if (!this.emailInput || !this.phoneInput) return;

//     //     const contactsData = {
//     //     email: this.emailInput.value.trim(),
//     //     phone: this.phoneInput.value.trim()
//     // };

//     // this.events.emit('contacts:submit', contactsData);
//     // }

//     open(): void {
//         const template = cloneTemplate<HTMLElement>('#contacts');
//         this.render(template);
        
//         this.initElements();
//         this.initEventListeners();
        
//         if (this.emailInput) this.emailInput.value = '';
//         if (this.phoneInput) this.phoneInput.value = '';
//         if (this.submitButton) this.submitButton.disabled = true;
//         this.hideError();
        
//         super.open();
//     }
// }