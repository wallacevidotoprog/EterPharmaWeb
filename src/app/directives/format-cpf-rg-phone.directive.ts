import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFormatCpf]',
  standalone: true,
})
export class FormatCpfDirective {
  constructor(private el: ElementRef) {}
  @HostListener('input', ['$event'])
  onInputChange(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    this.el.nativeElement.value = value;
  }
}

@Directive({
  selector: '[appFormatRg]',
  standalone: true,
})
export class FormatRgDirective {
  constructor(private el: ElementRef) {}
  @HostListener('input', ['$event'])
  onInputChange(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length <= 9) {
      value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
    }
    this.el.nativeElement.value = value;
  }
}

@Directive({
  selector: '[appFormatPhone]',
  standalone: true,
})
export class FormatPhoneDirective {
  constructor(private el: ElementRef) {}
  @HostListener('input', ['$event'])
  onInputChange(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      // Formato de telefone fixo: (XX) XXXX-XXXX
      value = value.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    } else if (value.length <= 11) {
      // Formato de telefone celular: (XX) XXXXX-XXXX
      value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }
    this.el.nativeElement.value = value;
  }
}
