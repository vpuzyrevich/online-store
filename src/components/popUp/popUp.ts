import './popUp.scss';

export class PopUp {
  popUp: HTMLDivElement;
  blackoutBlock: HTMLDivElement;
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.blackoutBlock = document.querySelector('.block');
  }
  show(message: string): void {
    this.popUp.textContent = `${message}`;
    this.popUp.style.display = 'block';
    this.blackoutBlock.classList.add('blackout');
  }
  hide(): void {
    this.blackoutBlock.addEventListener('click', () => {
      this.popUp.style.display = 'none';
      this.blackoutBlock.classList.remove('blackout');
    })
  }
}