import { ensureElement } from '../utils/utils';

export class Modal {
  protected container: HTMLElement;
  protected content: HTMLElement;
  private static currentOpenModal: Modal | null = null;

  constructor(containerId: string = '#modal-container') {
    this.container = ensureElement<HTMLElement>(containerId);
    this.content = ensureElement<HTMLElement>('.modal__content', this.container);
    this.container.addEventListener('click', this.handleClose.bind(this));
  }

open(content?: HTMLElement): void {
    // Закрываем предыдущее модальное окно
    if (Modal.currentOpenModal && Modal.currentOpenModal !== this) {
      Modal.currentOpenModal.close();
    }
    
    Modal.currentOpenModal = this;
    
    if (content) {
      this.render(content);
    }
    this.container.classList.add('modal_active');
    document.body.style.overflow = 'hidden';
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  close(): void {
    if (Modal.currentOpenModal === this) {
      Modal.currentOpenModal = null;
    }
    this.container.classList.remove('modal_active');
    document.body.style.overflow = '';
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