import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appFormInput]'
})
export class FormInputDirective {

  @Input() public numberOnly: boolean = false;

  constructor( private ngControl: NgControl ) { }

  @HostListener('blur') public onFormFieldBlur(): void {
    if (this.numberOnly) return;
    this.ngControl.control?.setValue(this.ngControl.value?.trim() ?? '');
  };

  @HostListener('keydown', ['$event']) public onKeyDown(event: KeyboardEvent): boolean {
    if (!this.numberOnly) return true; 
    return event.keyCode !== 69;
  }

}
