import { Products } from '../view/products/products';
import { Product } from './../../types/types';
import './sorting.scss'

export class Sorting {
  list: HTMLElement;
  fieldSorting: HTMLElement;
  listItems: NodeListOf<Element>;
  catalog: HTMLElement;
  constructor() {
    this.list = document.querySelector('.sorting-list');
    this.fieldSorting = document.querySelector('.catalog-sorting');
    this.listItems = document.querySelectorAll('.list-item');
    this.catalog = document.querySelector('.catalog-products');
  }

  sortByNameAZ(data: Product[], item: Element, products: HTMLCollection):void {
      if(item.textContent === 'по названию, от А до Z') {
        this.sortTemplate(data, (a, b):number => { 
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        }, products);
      }
  }

  sortByNameZA(data: Product[], item: Element, products: HTMLCollection): void {
    if(item.textContent === 'по названию, от Z до А') {
      this.sortTemplate(data, (a, b):number => { 
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      }, products);
    }
  }

  sortByYearAscending(data: Product[], item: Element, products: HTMLCollection): void {
    if(item.textContent === 'по году выпуска, по возрастанию') {
      this.sortTemplate(data, (a, b):number => a.year - b.year, products);
    }
  }

  sortByYearDescending(data: Product[], item: Element, products: HTMLCollection): void {
    if(item.textContent === 'по году выпуска, по убыванию') {
      this.sortTemplate(data, (a, b):number => b.year - a.year, products);
    }
  }

  sort(data: Product[]): void {
    const products = document.getElementsByClassName('catalog-item');
    this.fieldSorting.addEventListener('click', () => {
      this.list.classList.toggle('show');
    })
    
    this.listItems.forEach((item) => {
      item.addEventListener('click', () => {
        this.fieldSorting.querySelector('span').textContent = item.textContent;
        this.sortByNameAZ(data, item, products);
        this.sortByNameZA(data, item, products);
        this.sortByYearAscending(data, item, products);
        this.sortByYearDescending(data, item, products);

      });
    })
  }

  sortTemplate(
    data: Product[], 
    callback: (a: Product, b: Product) => number,
    products: HTMLCollection
    ):void {

    const tempData: Product[] = [];
    const idArr: number[] = [];

    [...products].forEach((product:Element) => {
      if(!product.classList.contains('hide')) {
        const idProduct = product.getAttribute('id');
      
        idArr.push(+idProduct);
      }
    });

    idArr.forEach((id) => {
      data.forEach((product) => {
        if(id === product.id) {
          tempData.push(product);
        }
      })
    })
    tempData.sort(callback);
    this.catalog.textContent = '';
    const productsInstance = new Products();
    tempData.forEach(item => {
      productsInstance.draw(item);
    });
  }
}