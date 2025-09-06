import { EventEmitter } from '../components/base/events';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ensureElement } from '../utils/utils';
import { Modal } from '../components/Modal';

export class AppView {
  private productContainer: HTMLElement;
  private cachedProducts: Product[];
  modal: Modal

  constructor(
    protected events: EventEmitter) {
    this.productContainer = ensureElement<HTMLElement>('.gallery');
    
    events.on('products:loaded', (products: Product[]) => {
      this.cachedProducts = products
      this.renderProducts();
    });
  }

  private renderProducts() {
        this.productContainer.innerHTML = '';
        
        if (this.cachedProducts.length === 0) {
            this.productContainer.innerHTML = '<p>Товары не найдены</p>';
            return;
        }

        this.cachedProducts.forEach(product => {
            const card = new ProductCard(product, this.events);
            this.productContainer.appendChild(card.getElement());
        });
    }

    updateDisplay() {
        this.renderProducts();
    }
}