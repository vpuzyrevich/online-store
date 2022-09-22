import { Sorting } from './../sorting/sorting';
import { Data } from "./data";
import { Search } from '../search/search';
import { RangeSlider } from '../view/range/rangeSlider';
import { Filters } from '../filters/filters';
import { PopUp } from '../popUp/popUp';

class App {
  data: Data;
  search: Search;
  sorting: Sorting;
  rangeSlider: RangeSlider;
  filter: Filters;
  popUp: PopUp;
  constructor() {
    this.data = new Data();
    this.search = new Search();
    this.sorting = new Sorting();
    this.rangeSlider = new RangeSlider();
    this.filter = new Filters();
    this.popUp = new PopUp();
  }

  start(data: string): void {
    const resetBtn = document.querySelector('.button-filters');
    this.data.getData(data).then((data)=>{
      this.search.find();
      this.sorting.sort(data);
      this.popUp.hide();
      this.rangeSlider.drawRange(this.rangeSlider.yearSliderInterface, data, this.rangeSlider.rangeSliderYear, this.rangeSlider.filterInputsYear);
      this.rangeSlider.drawRange(this.rangeSlider.amountSliderInterface, data, this.rangeSlider.rangeSliderAmount, this.rangeSlider.filterInputsAmount);
      this.filter.filter(data);
      resetBtn.addEventListener('click', () => {
        this.filter.clearFilters(data);
      });
    });
  }
}

export default App;