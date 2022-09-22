import { Product } from './../../types/types';
import { RangeSlider } from './../view/range/rangeSlider';
import { PopUp } from './../popUp/popUp';
import { Sorting } from "../sorting/sorting";
import './filters.scss';

export class Filters extends RangeSlider {
  filtersState: (boolean[] | number | string[])[];
  sorting: Sorting;

  constructor() {
    super();
    this.filtersState = [[], 2018, 2022, 1, 10, [], [], []];
    this.sorting = new Sorting();
  }

  filter(data: Product[]): void {
    const spliceEl = (i: number, el: number | boolean[] | string[]) => {
      this.filtersState.splice(i, 1, el);
    };

    this.filterInputsYear.forEach(input => {
      input.addEventListener('input', () => {
        spliceEl(1, +this.filterInputsYear[0].value);
        spliceEl(2, +this.filterInputsYear[1].value);
        this.renderingOfFilteredProducts(data);
      })
    })

    this.rangeSliderYear.noUiSlider.on('change', (values: (string | number)[]) => {
        spliceEl(1, Math.floor(+values[0]));
        spliceEl(2, Math.floor(+values[1]));
        this.renderingOfFilteredProducts(data);
    });

    this.filterInputsAmount.forEach(input => {
      input.addEventListener('change', () => {
        spliceEl(3, +this.filterInputsAmount[0].value);
        spliceEl(4, +this.filterInputsAmount[1].value);
        this.renderingOfFilteredProducts(data);
      })
    })

    this.rangeSliderAmount.noUiSlider.on('update', (values: (string | number)[]) => {
        spliceEl(3, Math.floor(+values[0]));
        spliceEl(4, Math.floor(+values[1]));
        this.renderingOfFilteredProducts(data);
    });

    const manufacturer: string[] = [];
    const color: string[] = [];
    const countCamera: string[] = [];
    this.filterByValue('#manufacturer', manufacturer, data, 0);
    this.filterByValue('#color', color, data, 5);
    this.filterByValue('#countCamera', countCamera, data, 6);
    this.filterByPopularity(data);
  }

  filterByValue (id: string, arr: string[], data: Product[], i: number):void {
    const filtersItem = document.querySelector(id);
    const checkboxInner = filtersItem.querySelectorAll('.filters-inner');

    checkboxInner.forEach(el => {
      el.addEventListener('click', (e: Event) => {
        const target = (e.currentTarget as HTMLElement).querySelector('.filters-checkbox');
        target.classList.toggle('active-bg');
        const lable = (e.currentTarget as HTMLElement).querySelector('.filters-lable');

        if(target.classList.contains('active-bg')) {
          arr.push(lable.textContent);
        } else {
          arr.splice(arr.indexOf(lable.textContent), 1);
        }

        const objSet: Set<string> = new Set([]);
        arr.forEach(item => {
          objSet.add(item);
        });

        this.filtersState.splice(i, 1, [...objSet]);
        this.renderingOfFilteredProducts(data);
      })
    })
  }

  filterByPopularity(data: Product[]): void {
    const checkbox = document.querySelector('#popularity');
    checkbox.addEventListener('click', () => {
      checkbox.classList.toggle('active-bg');
      const popularity: boolean[] = [];

      if(checkbox.classList.contains('active-bg')) {
        popularity.push(true);
      } else {
        popularity.splice(popularity.indexOf(true), 1);
      }
      const popularitySet = new Set([]);
      popularity.forEach(item => {
        popularitySet.add(item);
      });

      this.filtersState.splice(7, 1, [...popularity]);
      this.renderingOfFilteredProducts(data);
    })
  }

  clearFilters(data: Product[]): void {
    const checkboxes = document.querySelectorAll('.filters-checkbox');
      checkboxes.forEach((checkbox) => {
        if(checkbox.classList.contains('active-bg')) {
          checkbox.classList.remove('active-bg');
        }
      })
      this.rangeReset(this.rangeSliderYear, [2018, 2022]);
      this.rangeReset(this.rangeSliderAmount, [1, 10]);
      this.filtersState = [['Apple', 'Samsung', 'Xiaomi'], 2018, 2022, 1, 10, ['White', 'Grey', 'Blue', 'Yellow', 'Purple', 'Red', 'Gold'], ['1', '2', '3', '4'], [true, false]];
      this.renderingOfFilteredProducts(data);
  }

  isFilterProducts(
    product: Product, 
    filters: (boolean[] | number | string[])[]
    ): void {
    if((<string[]>filters[0]).length === 0) {
      filters[0] = ['Apple', 'Samsung', 'Xiaomi'];
    }
    if((<string[]>filters[5]).length === 0) {
      filters[5] = ['White', 'Grey', 'Blue', 'Yellow', 'Purple', 'Red', 'Gold'];
    }
    if((<string[]>filters[6]).length === 0) {
      filters[6] = ['1', '2', '3', '4'];
    }
    if((<string[]>filters[7]).length === 0) {
      filters[7] = [true, false];
    }

    if(product.year >= filters[1] && 
      product.year <= filters[2] && 
      product.amount >= filters[3] && 
      product.amount <= filters[4] && 
      (product.manufacturer === (<string[]>filters[0])[0] ||
      product.manufacturer === (<string[]>filters[0])[1] ||
      product.manufacturer === (<string[]>filters[0])[2]) && 
      (product.color === (<string[]>filters[5])[0] ||
      product.color === (<string[]>filters[5])[1] ||
      product.color === (<string[]>filters[5])[2] ||
      product.color === (<string[]>filters[5])[3] ||
      product.color === (<string[]>filters[5])[4] ||
      product.color === (<string[]>filters[5])[5] ||
      product.color === (<string[]>filters[5])[6]) && 
      (product.countCamera === (<string[]>filters[6])[0] ||
      product.countCamera === (<string[]>filters[6])[1] ||
      product.countCamera === (<string[]>filters[6])[2] ||
      product.countCamera === (<string[]>filters[6])[3]) && 
      (product.popularity === (<boolean[]>filters[7])[0] ||
      product.popularity === (<boolean[]>filters[7])[1])
      ) {
        this.draw(product);
    }
  }

  renderingOfFilteredProducts(data: Product[]): void {
    this.catalog.textContent = '';
    data.forEach(product => {
      this.isFilterProducts(product, this.filtersState);
    })

    const product = document.getElementsByClassName('catalog-item');

    [...this.cart.products].forEach(item => {
      item.addEventListener('click', () => {
        this.cart.addingToCart(data, item);
      })
    })
    if(![...product].length) {
      const popUp = new PopUp();
      popUp.show('Извините, совпадений не обнаружено');
    }
    this.sorting.sortByNameAZ(data, this.sorting.fieldSorting.querySelector('span'), document.getElementsByClassName('catalog-item'));
    this.sorting.sortByNameZA(data, this.sorting.fieldSorting.querySelector('span'), document.getElementsByClassName('catalog-item'));
    this.sorting.sortByYearAscending(data, this.sorting.fieldSorting.querySelector('span'), document.getElementsByClassName('catalog-item'));
    this.sorting.sortByYearDescending(data, this.sorting.fieldSorting.querySelector('span'), document.getElementsByClassName('catalog-item'));
  }
}