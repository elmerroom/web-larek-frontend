import { cloneTemplate, ensureElement } from "../utils/utils";
import { Modal } from "./Modal";
import { Component } from "./base/Component";
import { EventEmitter } from "./base/events";

interface ISuccessModal {
    textDescription: string;
}

export class SuccessModal extends Component<ISuccessModal> {
    private closeButton: HTMLButtonElement;
    private description: HTMLElement;

    constructor(container: HTMLElement, events: EventEmitter, total: number) {
        super(container);
        
        const template = cloneTemplate<HTMLElement>('#success');
        // this.render(template);
        
        this.description = ensureElement<HTMLElement>('.order-success__description', template);
        this.description.textContent = `Списано ${total} синапсов`;
        
        this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', template);
        this.closeButton.addEventListener('click', () => {
            // this.close();
            events.emit('success:closed');
        });
    }

    render(): HTMLElement {
        const template = cloneTemplate<HTMLElement>('#success');
        // ... инициализация компонента
        return template;
    }
}