import { cloneTemplate, ensureElement } from "../utils/utils";
import { Modal } from "./Modal";
import { EventEmitter } from "./base/events";

export class SuccessModal extends Modal {
    private closeButton: HTMLButtonElement;
    private description: HTMLElement;

    constructor(events: EventEmitter, total: number) {
        super(events);
        
        const template = cloneTemplate<HTMLElement>('#success');
        this.render(template);
        
        this.description = ensureElement<HTMLElement>('.order-success__description', template);
        this.description.textContent = `Списано ${total} синапсов`;
        
        this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', template);
        this.closeButton.addEventListener('click', () => {
            this.close();
            events.emit('success:closed');
        });
    }
}