import { IEvents } from "../base/events";
import { Modal } from "../newComponents/Common/Modal";
import { Product } from "../../types";

interface IProductModal {

}

export class ProductModal extends Modal<Product> {
  private imageElement: HTMLImageElement;
  private productTitle: HTMLElement;
  private productCategory: HTMLElement;
  private productDescription: HTMLElement;
  private productPrice: HTMLElement;
  private productBasketButton: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this.imageElement = this.container.querySelector('.card__image');
    this.productTitle = this.container.querySelector('.card__title');
    this.productCategory = this.container.querySelector('.card__category');
    this.productDescription = this.container.querySelector('.card__text');
    this.productPrice = this.container.querySelector('.card__price');
    this.productBasketButton = this.container.querySelector('.button');
  }

  set productFull({id, title, description, price, category, image}: Product) {
    this.imageElement.src = image;
    this.imageElement.alt = `Изображение ${title}`;
    this.productTitle.textContent = title;
    this.productCategory.textContent = category;
    this.productDescription.textContent = description;
    this.productPrice.textContent = price ? `${price} синапсов` 
        : 'Бесценно';

        this.productCategory.classList.remove('card__category_soft');
        switch (category) {
        case 'хард-скил':
          this.productCategory.classList.add('card__category_hard');
          break;
        case 'софт-скил':
          this.productCategory.classList.add('card__category_soft');
          break;
        case 'дополнительное':
          this.productCategory.classList.add('card__category_additional');
          break;
        case 'кнопка':
          this.productCategory.classList.add('card__category_button');
          break;
        default:
          this.productCategory.classList.add('card__category_other');
      }

      super.open()
  }
}