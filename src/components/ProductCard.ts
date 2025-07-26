import { cloneTemplate } from '../utils/utils';
import { Product } from '../types';
import { EventEmitter } from '../components/base/events';
import { CDN_URL } from '../utils/constants';

export class ProductCard {
  private element: HTMLElement;

  constructor(protected product: Product,
    protected events: EventEmitter) {
    this.element = cloneTemplate<HTMLElement>('#card-catalog');
    this.render();
    this.setupEvents();
  }

  private render(): void {
    this.element.querySelector('.card__title')!.textContent = this.product.title;
    this.element.querySelector('.card__price')!.textContent = 
      this.product.price ? `${this.product.price} синапсов` : 'Бесценно';
      const categoryElement = this.element.querySelector('.card__category');
        if (categoryElement) {
            categoryElement.textContent = this.product.category;
            categoryElement.classList.remove('card__category_soft');
        switch (this.product.category) {
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
      
      const imageElement = this.element.querySelector('.card__image') as HTMLImageElement;
    if (imageElement && this.product.image) {
      imageElement.src = `${CDN_URL}${this.product.image}`;
      imageElement.alt = this.product.title;
    }
  }

  private setupEvents(): void {

    this.element.addEventListener('click', (event) => {
  if (!(event.target as HTMLElement).closest('.card__button')) {
    if (!this.product) {
      console.error('Продукт не найден');
      return;
    }
    this.events.emit('product:preview', this.product);
  }
});

  const button = this.element.querySelector('.card__button');
  if (button) {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      this.events.emit('product:add', this.product);
    });
  }
  }

  getElement(): HTMLElement {
    return this.element;
  }
}