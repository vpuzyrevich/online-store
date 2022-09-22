import { Products } from './../products/products';
import 'nouislider/dist/nouislider.css';
import noUiSlider from 'nouislider';
import './rangeSlider.scss';
import { TargetElement } from '../../../types/nouislider';
import { Product } from '../../../types/types';

export class RangeSlider extends Products {
  rangeSliderYear: TargetElement;
  rangeSliderAmount: TargetElement;
  filterInputsYear: NodeListOf<HTMLInputElement>;
  filterInputsAmount: NodeListOf<HTMLInputElement>;

  constructor() {
    super();
    this.rangeSliderYear = document.querySelector('#year');
    this.rangeSliderAmount = document.querySelector('#amount');
    this.filterInputsYear = document.querySelectorAll('#inputYear');
    this.filterInputsAmount = document.querySelectorAll('#inputAmount');
  }

  yearSliderInterface(rangeBlock: TargetElement): void {
    noUiSlider.create(rangeBlock, {
      start: [2018, 2022],
      connect: true,
      step: 1,
      range: {
          'min': 2018,
          'max': 2022
      }
    });
  }

  amountSliderInterface(rangeBlock: TargetElement): void {
    noUiSlider.create(rangeBlock, {
      start: [1, 10],
      connect: true,
      step: 1,
      range: {
        'min': 1,
        'max': 10
      }
    });
  }

  drawRange(
    callback: (rangeBlock: TargetElement) => void, 
    data: Product[], rangeBlock: TargetElement, 
    filterInputs: NodeListOf<HTMLInputElement>
    ): void {

    callback(rangeBlock);
  
    const inputs: (HTMLInputElement | undefined)[] = [];
    
    filterInputs.forEach((input, id) => {
      inputs.push(input);
      input.addEventListener('change', (e) => {
        const arr: string[] = [];
        arr[id] = (e.currentTarget as HTMLInputElement).value;
        rangeBlock.noUiSlider.set(arr);
      })
    });

    rangeBlock.noUiSlider.on('update', (values: (string | number)[], handle:  number) => {
      inputs[handle].value = `${Math.round(+values[handle])}`;
    });
   
  }

  rangeReset(rangeBlock: TargetElement, arr: number[]): void {
    rangeBlock.noUiSlider.set(arr);
  }
}