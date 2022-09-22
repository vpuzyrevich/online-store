import { PopUp } from '../popUp/popUp';
import './search.scss';

export class Search {
  find(): void {
    const searchInput: HTMLInputElement = document.querySelector('.header-input');
    const product = document.getElementsByClassName('catalog-item');
    
    searchInput.addEventListener('input', function() {
      const value = searchInput.value.trim().toLowerCase();
      if(value != '') {
        [...product].forEach((elem) => {
          if(elem.querySelector('.item-name').textContent.toLowerCase().search(value) === -1) {
            elem.classList.add('hide');
          } else {
            elem.classList.remove('hide');
          }
        });

        const isHide = [...product].every((item) => item.classList.contains('hide'))
        const popUp = new PopUp();

        if(isHide) {
          popUp.show('Извините, совпадений не обнаружено');
          searchInput.setAttribute('readonly', 'readonly');
        }

        popUp.blackoutBlock.addEventListener('click', () => searchInput.removeAttribute('readonly'));

      } else {
        [...product].forEach((elem) => {
          elem.classList.remove('hide');
        });
      }
    });
  }
}