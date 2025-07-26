import { cloneTemplate, ensureElement } from '../utils/utils';
import { EventEmitter } from '../components/base/events';
import { Product } from '../types';
import { Modal } from './Modal';

export class Basket {
  private list: HTMLElement;
  private total: HTMLElement;
  private button: HTMLElement;
  private checkoutButton: HTMLElement;
  private element: HTMLElement;
  private events: EventEmitter;
  private modal: Modal;
  private emptyMessage: HTMLElement;

  constructor(modal: Modal, events: EventEmitter, initialProducts: Product[] = []) {
    this.modal = modal;
    this.events = events;
    this.element = cloneTemplate<HTMLElement>('#basket');
    this.list = ensureElement<HTMLElement>('.basket__list', this.element);
    this.total = ensureElement<HTMLElement>('.basket__price', this.element);
    this.button = ensureElement<HTMLElement>('.header__basket');
    this.checkoutButton = ensureElement<HTMLElement>('.basket__button', this.element);
    this.emptyMessage = this.createEmptyMessage();

    this.renderItems(initialProducts);

    this.button.addEventListener('click', () => {
      this.events.emit('basket:open');
    });

    this.checkoutButton.addEventListener('click', () => {
    if (this.checkoutButton.hasAttribute('disabled')) return;
  

  this.modal.close();
  

  events.emit('order:start');
    });

    this.events.on('basket:changed', (products: Product[]) => {
      this.renderItems(products);
    });

    this.events.on('basket:open', () => {
      this.modal.open(this.element);
    });
  }

  private createEmptyMessage(): HTMLElement {
    const message = document.createElement('span');
    message.classList.add('basket__empty');
    message.textContent = 'Корзина пуста';
    return message;
  }

  private renderItems(products: Product[]): void {
    this.list.innerHTML = '';
    
    if (products.length === 0) {
      this.list.appendChild(this.emptyMessage);
      this.checkoutButton.setAttribute('disabled', 'true');
      this.total.textContent = '0 синапсов';
    } else {
      products.forEach((item, index) => {
        const element = cloneTemplate<HTMLElement>('#card-basket');
        element.querySelector('.basket__item-index')!.textContent = String(index + 1);
        element.querySelector('.card__title')!.textContent = item.title;
        element.querySelector('.card__price')!.textContent = `${item.price} синапсов`;
        
        const deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', element);
        deleteButton.addEventListener('click', (e) => {
          e.stopPropagation();
          this.events.emit('basket:remove', item);
        });
        
        this.list.appendChild(element);
      });
      
      this.checkoutButton.removeAttribute('disabled');
      this.total.textContent = `${products.reduce((sum, item) => sum + (item.price || 0), 0)} синапсов`;
    }
  }
}