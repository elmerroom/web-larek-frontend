import { IEvents } from "../base/events";
import { IProductPreview, Product } from "../../types";
import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { CDN_URL } from "../../utils/constants";
import { ProductComponent } from "./ProductComponent";





export class ProductPreview extends ProductComponent{

  protected events: IEvents;
  protected imageElement: HTMLImageElement;
  // protected titleElement: HTMLElement;
  protected categoryElement: HTMLElement
  protected descriptionElement: HTMLElement;
  // protected priceElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;
  // protected idCard: string;
  // protected product: Product


  constructor(container: HTMLElement, events: IEvents, product: Product) {
    super(container, product)
    this.events = events
    // this.product = product

    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    // this.titleElement = ensureElement<HTMLElement>('.card__title', this.container) ;
    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container) ;
    this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container) ;
    // this.priceElement = ensureElement<HTMLElement>('.card__price', this.container) ;
    this.buttonElement = ensureElement<HTMLButtonElement>('.button', this.container);
    this.categoryElement.classList.remove('card__category_other')
  }

    // set title(value: string) {
    //   this.setText(this.titleElement, value)
    // }

    set image(value: string) {
      this.setImage(this.imageElement, `${CDN_URL}${value}`, this.title)
    }

    set category(value: string) {
      this.setText(this.categoryElement, value);
      
      switch (value) {
      case 'хард-скил':
        this.categoryElement.classList.add('card__category_hard');
        break;
      case 'софт-скил':
        this.categoryElement.classList.add('card__category_soft');
        break;
      case 'дополнительное':
        this.categoryElement.classList.add('card__category_additional');
        break;
      case 'кнопка':
        this.categoryElement.classList.add('card__category_button');
        break;
      default:
        this.categoryElement.classList.add('card__category_other');
    }
    }

    set description(value: string) {
      this.setText(this.descriptionElement, value)
    }

    // set price(value: number | null) {
    //   this.setText(this.priceElement, value ? `${value} синапсов` : `Бесценно`);
    //   if (!value) {
    //     this.buttonElement.textContent = 'Недоступно'
    //   super.setDisabled(this.buttonElement, true)
    //   }
    // }

    // set id(value: string) {
    //   this.idCard = value
    // }

    set inBasket(value: boolean) {
      if (value) {
        this.buttonElement.textContent = 'Удалить из корзины';
        this.buttonElement.addEventListener('click', (event) => {
          event.stopPropagation();
          this.events.emit('product:removeProduct', this.product);
        })
      } else if (this.buttonElement.textContent === `Недоступно`) {
        return
      } else {
        this.buttonElement.textContent = "В корзину";
         this.buttonElement.addEventListener('click', (event) => {
      event.stopPropagation();
      this.events.emit('product:add', this.product);
      })
    }
  }


  render(data?: Partial<IProductPreview>): HTMLElement {
    if (data) {
      Object.assign(this, data);
    }
    return this.container;
  }
}