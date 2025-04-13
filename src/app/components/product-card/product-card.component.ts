import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {PricePipe} from '../../pipes/price.pipe';
import {HighlightDirective} from '../../directives/highlight.directive';
import {DisableIfInCartDirective} from '../../directives/disable-if-in-cart.directive';
import {CurrencyPosition} from '../../enums/currency-position.enum';

@Component({
  selector: 'app-product-card',
  imports: [
    MatCard,
    MatCardImage,
    MatCardContent,
    PricePipe,
    HighlightDirective,
    DisableIfInCartDirective
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product: any;
  @Input() currency: string = 'Ft';
  @Input() currencyPosition: CurrencyPosition = CurrencyPosition.RIGHT;
  @Input() isClicked: boolean = false;
  @Output() addToCart = new EventEmitter<any>();
  @Output() isClickedChange = new EventEmitter<boolean>();

  handleClick() {
    if (!this.isClicked) {
      this.isClicked = true;
      this.isClickedChange.emit(this.isClicked);
      this.addToCart.emit(this.product);
    }
  }
}
