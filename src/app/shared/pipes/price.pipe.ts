import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: number | null, currency: string): string {
    if (!value) return '';
    
    return `${currency} ${value.toFixed(2)}`;
  }

}
