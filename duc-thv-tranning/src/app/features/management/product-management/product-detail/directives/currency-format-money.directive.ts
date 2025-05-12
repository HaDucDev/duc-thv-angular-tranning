import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Directive({
  selector: '[appCurrencyFormatMoney]'
})
export class CurrencyFormatMoneyDirective {
  @Input() currencySymbol: string = 'USD';
  @Input() decimalPlaces: string = '1.2-2';

  constructor(private el: ElementRef, private currencyPipe: CurrencyPipe) {}

  ngAfterViewInit() {
    const input = this.el.nativeElement as HTMLInputElement;
    const value = input.value;
    input.value = this.formatCurrency(value);
  }
  
  @HostListener('blur') onBlur() {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value;

    // Chỉ định format khi blur
    value = this.formatCurrency(value);
    input.value = value;
  }

  @HostListener('focus') onFocus() {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value;

    // Khi focus lại, hiển thị giá trị gốc
    input.value = value.replace(/[^\d.-]/g, '');
  }

  @HostListener('input', ['$event']) onInput(event: any) {
    const input = event.target;
    let value = input.value.replace(/[^\d.-]/g, '');

    // Lưu lại giá trị số khi người dùng nhập
    input.value = value;
  }

  private formatCurrency(value: string): string {
    const rawValue = value.replace(/[^\d.-]/g, ''); // Lọc các ký tự không phải số
    if (rawValue) {
      return this.currencyPipe.transform(rawValue, this.currencySymbol, 'symbol', this.decimalPlaces) || '';
    }
    return '';
  }
}
