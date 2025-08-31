import { IEvents } from "../base/events";
import { Modal } from "../newComponents/Common/Modal";
import { Product } from "../../types";
import { Component } from "../base/Component";
import { cloneTemplate } from "../../utils/utils";
import { CDN_URL } from "../../utils/constants";

// interface IProductModal {

// }

// export class ProductModal extends Modal<Product> {
//   private imageElement: HTMLImageElement;
//   private productTitle: HTMLElement;
//   private productCategory: HTMLElement;
//   private productDescription: HTMLElement;
//   private productPrice: HTMLElement;
//   private productBasketButton: HTMLButtonElement;

//   constructor(container: HTMLElement, events: IEvents) {
//     super(container, events);

//     this.imageElement = this.container.querySelector('.card__image');
//     this.productTitle = this.container.querySelector('.card__title');
//     this.productCategory = this.container.querySelector('.card__category');
//     this.productDescription = this.container.querySelector('.card__text');
//     this.productPrice = this.container.querySelector('.card__price');
//     this.productBasketButton = this.container.querySelector('.button');
//   }

//   set productFull({id, title, description, price, category, image}: Product) {
//     this.imageElement.src = image;
//     this.imageElement.alt = `Изображение ${title}`;
//     this.productTitle.textContent = title;
//     this.productCategory.textContent = category;
//     this.productDescription.textContent = description;
//     this.productPrice.textContent = price ? `${price} синапсов` 
//         : 'Бесценно';

//         this.productCategory.classList.remove('card__category_soft');
//         switch (category) {
//         case 'хард-скил':
//           this.productCategory.classList.add('card__category_hard');
//           break;
//         case 'софт-скил':
//           this.productCategory.classList.add('card__category_soft');
//           break;
//         case 'дополнительное':
//           this.productCategory.classList.add('card__category_additional');
//           break;
//         case 'кнопка':
//           this.productCategory.classList.add('card__category_button');
//           break;
//         default:
//           this.productCategory.classList.add('card__category_other');
//       }

//       super.open()
//   }
// }

export class ProductModal {

  private previewTemplate: HTMLTemplateElement;

  constructor() {
    // super(container)
   this.previewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
  }

  createProductContent(product: Product): HTMLElement {
    const content = cloneTemplate(this.previewTemplate);
    
    const imageElement = content.querySelector('.card__image') as HTMLImageElement;
    // console.log(imageElement)
    const titleElement = content.querySelector('.card__title') as HTMLElement;
    // console.log(titleElement)
    const categoryElement = content.querySelector('.card__category') as HTMLElement;
    // console.log(categoryElement)
    const descriptionElement = content.querySelector('.card__text') as HTMLElement;
    // console.log(descriptionElement)
    const priceElement = content.querySelector('.card__price') as HTMLElement;
    // console.log(priceElement)
    const buttonElement = content.querySelector('.button') as HTMLButtonElement;

    // Заполняем данные
    imageElement.src = `${CDN_URL}${product.image}`;
    imageElement.alt = `Изображение ${product.title}`;
    titleElement.textContent = product.title;
    categoryElement.textContent = product.category;
    descriptionElement.textContent = product.description;
    priceElement.textContent = product.price ? `${product.price} синапсов` : 'Бесценно';

    // Устанавливаем класс категории
    this.setCategoryClass(categoryElement, product.category);

    // Добавляем data-атрибут для идентификации продукта
    buttonElement.dataset.productId = product.id;

    return content;
  }

  // Вспомогательный метод для установки класса категории
  private setCategoryClass(element: HTMLElement, category: string): void {
    element.className = 'card__category';
    
    switch (category) {
      case 'хард-скил':
        element.classList.add('card__category_hard');
        break;
      case 'софт-скил':
        element.classList.add('card__category_soft');
        break;
      case 'дополнительное':
        element.classList.add('card__category_additional');
        break;
      case 'кнопка':
        element.classList.add('card__category_button');
        break;
      default:
        element.classList.add('card__category_other');
    }
  }

  render(data: Partial<Product>): HTMLElement {
    Object.assign(this as object, data)
    return this.previewTemplate
  }
}