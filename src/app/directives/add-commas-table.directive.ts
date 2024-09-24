import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import bigDecimal from 'js-big-decimal';

@Directive({
  selector: '[appAddCommasTable]',
  standalone: true,
})
export class AddCommasTableDirective {
  private innerText: string = '';
  @Input('appAddCommasTable') columnName: string = '';

  constructor(private elRef: ElementRef, private render?: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.innerText = this.elRef.nativeElement.innerText;
    if (this.innerText !== undefined && this.innerText !== null) {
      this.innerText = this.innerText.toString();
      if (
        this.innerText.search(/a-zA-Z-/) != -1 ||
        this.innerText.search(/-/) != -1 ||
        this.columnName.toLowerCase().includes('year') ||
        this.columnName.toLowerCase() === 'referenceno'
      )
        return;

      try {
        this.innerText = this.innerText.replace(/,/g, '');
        const value = parseFloat(this.innerText);

        if (!isNaN(value)) {
          const nf = new bigDecimal(this.innerText);
          this.elRef.nativeElement.innerHTML = nf.getPrettyValue();
        }
      } catch (error) {
        this.elRef.nativeElement.innerHTML = this.innerText;
      }
    }
  }
}
