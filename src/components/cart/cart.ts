import { Product } from './../../types/types';
import { PopUp } from "../popUp/popUp";
import './cart.scss';

export class Cart {
  popUp: PopUp;
  products: HTMLCollection;
  countProducts: number[];
  constructor() {
    this.popUp = new PopUp();
    this.products = document.getElementsByClassName('catalog-item');
    this.countProducts = [];
  }
  addingToCart(data: Product[], item: Element): void {
    const btnCount = document.querySelector('.cart-count');
    const btnAddToCart = item.querySelector('.item-cart');
    const id = +item.getAttribute('id');
      
    if(!item.classList.contains('active-card')) {
      this.addActiveStyles(item, btnAddToCart);
      if(this.countProducts.indexOf(id) === -1) {
        this.countProducts.push(id);
      }
    } else {
      this.removeActiveStyles(item, btnAddToCart);
      this.countProducts.splice(this.countProducts.indexOf(id), 1);
    }

    data.forEach(product => {
      if(product.id === id) {
        if(!product.inCart) {
          product.inCart = true;
        } else {
          product.inCart = false;
        }
      }
    });

    if(this.countProducts.length > 20) {
      this.popUp.show('Извините, все слоты заполнены');
      this.removeActiveStyles(item, btnAddToCart);
      this.countProducts.splice(20, 1);
    }
    btnCount.textContent = `${this.countProducts.length}`;

    this.popUp.hide();
  }

  addActiveStyles(item: Element, btn: Element): void {
    item.classList.add('active-card');
    btn.classList.add('active-bg');
    btn.textContent = 'Добавлен в корзину';
  }

  removeActiveStyles(item: Element, btn: Element): void {
    item.classList.remove('active-card');
    btn.classList.remove('active-bg');
    btn.textContent = 'В корзину';
  }
}