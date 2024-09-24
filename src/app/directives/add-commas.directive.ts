import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import bigDecimal from 'js-big-decimal';

@Directive({
  selector: '[appAddCommas]',
  standalone: true,
})
export class AddCommasDirective implements OnInit {
  @Input() issCurrency: boolean = false;

  constructor(private elRef?: ElementRef, private render?: Renderer2) {}

  ngOnInit(): void {}

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    const key: string = event.key;
    const value: string = (event.target as HTMLInputElement).value;

    // Allow only digits and one '.'
    if (key === '.' && value.includes('.')) {
      event.preventDefault();
      return;
    }

    if (!(key >= '0' && key <= '9') && key !== '.') {
      event.preventDefault();
      return;
    }
  }

  @HostListener('blur', ['$event']) onBlur(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove commas and check for multiple dots
    value = value.replace(/,/g, '');
    if (value.split('.').length > 2) {
      // Only keep the first dot and remove others
      const [integerPart, decimalPart] = value.split('.');
      value = `${integerPart}.${decimalPart.replace(/\./g, '')}`;
    }

    // Format the number with commas
    if (value) {
      const nf = new bigDecimal(value);
      input.value = nf.getPrettyValue();
    } else {
      input.value = '';
    }
  }

  @HostListener('input', ['$event.target']) onValueChange(
    el: HTMLInputElement
  ) {
    let value = el.value.replace(/,/g, '');

    // Prevent multiple dots
    if (value.split('.').length > 2) {
      // Only keep the first dot and remove others
      const [integerPart, decimalPart] = value.split('.');
      value = `${integerPart}.${decimalPart.replace(/\./g, '')}`;
    }

    if (value == '') {
      el.value = '';
      return;
    }

    const nf = new bigDecimal(value);
    el.value = nf.getPrettyValue();
  }
}
