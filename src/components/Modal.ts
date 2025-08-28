import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { EventEmitter, IEvents } from './base/events';

interface IModalData {
    content: HTMLElement;
}

export class Modal extends Component<IModalData> {
  // protected container: HTMLElement;
  protected _content: HTMLElement;
  // private static currentOpenModal: Modal | null = null;
  protected _pageWrapper: HTMLElement;
  protected _closeButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents
    // protected events: EventEmitter, containerId: string = '#modal-container'
  ) {
    super(container)
    // this.container = ensureElement<HTMLElement>(containerId);
    this._content = ensureElement<HTMLElement>('.modal__content', container);
    this._pageWrapper = ensureElement<HTMLElement>('.page__wrapper');
    this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);

    this.container.addEventListener('click', this.close.bind(this));
    this._closeButton.addEventListener('click', this.close.bind(this));
    this._content.addEventListener('click', (event) => event.stopPropagation());


    // this.events.on('modal:open', (openedModal: Modal) => {
    //   if (openedModal !== this) {
    //     this.close();
    //   }
    // });
  }

  set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

open(content?: HTMLElement): void {
   if (content) {
            this.content = content;
        }
    // this.events.emit('modal:open', this);
    
    // if (content) {
    //   this.render(content);
    // }
    this.container.classList.add('modal_active');
    this._pageWrapper.classList.add('page__wrapper_locked')
    this.events.emit('modal:open')
  }

  close(): void {
    this.container.classList.remove('modal_active');
    // this.content = null;
    this._pageWrapper.classList.remove('page__wrapper_locked')
    this.events.emit('modal:close')
  }

  render(data: IModalData): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }

  // protected render(content: HTMLElement): void {
  //   this._content.replaceChildren(content);
  // }

  // private handleClose(e: MouseEvent): void {
  //   if (e.target === this.container || 
  //       (e.target as HTMLElement).closest('.modal__close')) {
  //     this.close();
  //   }
  // }
}