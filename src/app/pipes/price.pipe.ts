import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
export class PricePipe implements PipeTransform {

  transform(value: number, currency: string = '$', position: 'before' | 'after' = 'before'): string {
    if (isNaN(value)) return 'Invalid price';
    const formattedPrice = value.toFixed(2);

    return position === 'before' ? `${currency} ${formattedPrice}` : `${formattedPrice} ${currency}`;
  }

}
