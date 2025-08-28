import { Product } from '../types';
import { EventEmitter } from './base/events';
import { ensureElement, cloneTemplate } from '../utils/utils';
import { Modal } from './Modal';
import { CDN_URL } from '../utils/constants';

export class ProductModal  {
  private product: Product | null;
  protected events: EventEmitter;
  private button: HTMLButtonElement | null;
  private inBasket: boolean;


  constructor(
     product: Product,
    events: EventEmitter,
    inBasket: boolean,
  ) {
    // super(events);
    this.events = events;
    this.inBasket = inBasket;
    if (!product) {
      console.error('Продукт не найден');
      return;
    }
    
    this.product = product;

    this.render();
    // this.open();
  }

   render(): HTMLElement {
    if (!this.product) return;

    const template = cloneTemplate<HTMLElement>('#card-preview');
    
    const titleElement = template.querySelector('.card__title');
    const priceElement = template.querySelector('.card__price');
    
    if (titleElement) titleElement.textContent = this.product.title || 'Без названия';
    
    if (priceElement) {
      priceElement.textContent = this.product.price 
        ? `${this.product.price} синапсов` 
        : 'Бесценно';
    }
    
    const categoryElement = template.querySelector('.card__category');
    if (categoryElement) {
      categoryElement.textContent = this.product.category;

      const categoryClass = this.product.category 
      categoryElement.classList.remove('card__category_other');
      switch (categoryClass) {
        case 'хард-скил':
          categoryElement.classList.add('card__category_hard');
          break;
        case 'софт-скил':
          categoryElement.classList.add('card__category_soft');
          break;
        case 'дополнительное':
          categoryElement.classList.add('card__category_additional');
          break;
        case 'кнопка':
          categoryElement.classList.add('card__category_button');
          break;
        default:
          categoryElement.classList.add('card__category_other');
      }
    }


    const imageElement = template.querySelector('.card__image');
    if (imageElement) {
      const img = imageElement as HTMLImageElement;
      img.alt = this.product.title || 'Изображение товара';
      if (this.product.image) {
        img.src =`${CDN_URL}${this.product.image}` ;
      } else {
        img.src = '../images/Subtract.svg';
      }
    }


    this.button = ensureElement<HTMLButtonElement>('.card__button', template);
    this.updateButton();

    if (this.button) {
      this.button.addEventListener('click', () => {
        this.handleButtonClick();
      });
    }

    // this.render(template);
    return template;
  }

  private updateButton(): void {
  if (!this.button || !this.product) return;
  

  this.button.textContent = this.inBasket 
    ? 'Удалить из корзины' 
    : 'В корзину';
  

  const isPriceInvalid = this.product.price === null || 
                        this.product.price === undefined || 
                        isNaN(Number(this.product.price)) || 
                        this.product.price <= 0;


  if (isPriceInvalid) {
    this.button.setAttribute('disabled', 'true');
    this.button.textContent = 'Недоступно';
  } else {
    this.button.removeAttribute('disabled');
  }
}

  private handleButtonClick(): void {
    if (!this.product) return;
    
    if (this.inBasket) {
      this.events.emit('basket:remove', this.product);
    } else {
      this.events.emit('product:add', this.product);
    }
    // this.close();
  }
}