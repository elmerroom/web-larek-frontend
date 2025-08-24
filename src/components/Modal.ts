import { ensureElement } from '../utils/utils';
import { EventEmitter } from './base/events';


export class Modal {
  protected container: HTMLElement;
  protected content: HTMLElement;
  // private static currentOpenModal: Modal | null = null;
  protected pageWrapper: HTMLElement;

  constructor(protected events: EventEmitter, containerId: string = '#modal-container') {
    this.container = ensureElement<HTMLElement>(containerId);
    this.content = ensureElement<HTMLElement>('.modal__content', this.container);
    this.container.addEventListener('click', this.handleClose.bind(this));
    this.pageWrapper = ensureElement<HTMLElement>('.page__wrapper');

    this.events.on('modal:open', (openedModal: Modal) => {
      if (openedModal !== this) {
        this.close();
      }
    });
  }

open(content?: HTMLElement): void {
    // Закрываем предыдущее модальное окно
    // if (Modal.currentOpenModal && Modal.currentOpenModal !== this) {
    //   Modal.currentOpenModal.close();
    // }
    
    // Modal.currentOpenModal = this;
    this.events.emit('modal:open', this);
    
    if (content) {
      this.render(content);
    }
    this.container.classList.add('modal_active');
    this.pageWrapper.classList.add('page__wrapper_locked')
    // document.body.style.overflow = 'hidden';
    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth'
    // });

//     .page__wrapper {
// 	width: 100%;

// 	&_locked {
// 		position: fixed;
// 	}
// }
  }

  close(): void {
    // if (Modal.currentOpenModal === this) {
    //   Modal.currentOpenModal = null;
    // }
    this.container.classList.remove('modal_active');
    // document.body.style.overflow = '';
    this.pageWrapper.classList.remove('page__wrapper_locked')
  }

  protected render(content: HTMLElement): void {
    this.content.replaceChildren(content);
  }

  private handleClose(e: MouseEvent): void {
    if (e.target === this.container || 
        (e.target as HTMLElement).closest('.modal__close')) {
      this.close();
    }
  }
}