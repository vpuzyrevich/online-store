import { Cart } from './../../cart/cart';
import { Product } from "../../../types/types";
import './products.scss';


export class Products {
  catalog: HTMLElement;
  cart: Cart;
  constructor () {
    this.catalog = document.querySelector('.catalog-products');
    this.cart = new Cart();
  }
  createTemplate(product: Product): HTMLElement {
    const catalogItem = document.querySelector('#productsItemTemp') as HTMLTemplateElement;
    const catalogClone = catalogItem.content.cloneNode(true) as HTMLElement;
    const btnAddToCart = catalogClone.querySelector('.catalog-item').querySelector('.item-cart');

    catalogClone.querySelector('.catalog-item').setAttribute('id', `${product.id}`);
    catalogClone.querySelector('.item-img').setAttribute('src', product.src);
    catalogClone.querySelector('.item-img').setAttribute('alt', product.name);
    catalogClone.querySelector('.item-name').textContent = product.name;
    catalogClone.querySelector('.item-manufacturer').textContent = product.manufacturer;
    catalogClone.querySelector('.item-amount').textContent = `${product.amount}`;
    catalogClone.querySelector('.item-year').textContent = `${product.year}`;
    catalogClone.querySelector('.item-color').textContent = product.color;
    catalogClone.querySelector('.item-camera').textContent = product.countCamera;
    catalogClone.querySelector('.item-popularity').textContent = product.popularity ? 'Да' : 'Нет';
    catalogClone.querySelector('.item-price').textContent = product.price;
    
    if(product.inCart) {
      catalogClone.querySelector('.catalog-item').classList.add('active-card');
      btnAddToCart.classList.add('active-bg');
      btnAddToCart.textContent = 'Добавлен в корзину';
    }

    return catalogClone;
  }

  draw(product: Product):void {
    const catalog = document.querySelector('.catalog-products');
      const card = this.createTemplate(product);
      catalog.appendChild(card);
  }
}