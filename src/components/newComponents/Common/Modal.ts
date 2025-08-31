import { IEvents } from './../../base/events';
import { Component } from "../../base/Component";
import { ensureElement } from '../../../utils/utils';


export class Modal<T> extends Component<T> {
  protected modal: HTMLElement;
  protected events: IEvents;
  protected pageWrapper: HTMLElement;
  protected _content: HTMLElement

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;
    const closeButtonElement = this.container.querySelector(".modal__close");
    this.pageWrapper = ensureElement<HTMLElement>('.page__wrapper');
    this._content = ensureElement<HTMLElement>('.modal__content')

      closeButtonElement.addEventListener("click", this.close.bind(this));
      this.container.addEventListener("mousedown", (evt) => {
        if (evt.target === evt.currentTarget) {
          this.close();
        }
      });
      this.handleEscUp = this.handleEscUp.bind(this);
    }

    set content(value: HTMLElement) {
      this._content.replaceChildren(value)
    }
  
    open(content?: HTMLElement) {
      if (content) {
            this.content = content;
        }

      this.container.classList.add("modal_active");
      document.addEventListener("keyup", this.handleEscUp);
      this.pageWrapper.classList.add('page__wrapper_locked');
        }
  
    close() {
      this.container.classList.remove("modal_active");
      document.removeEventListener("keyup", this.handleEscUp);
       this.pageWrapper.classList.remove('page__wrapper_locked')
       this.content = null
    }
  
    handleEscUp (evt: KeyboardEvent) {
        if (evt.key === "Escape") {
          this.close();
        }
      };
  }