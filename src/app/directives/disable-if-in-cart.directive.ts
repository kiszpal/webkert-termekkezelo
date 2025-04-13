import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDisableIfInCart]'
})
export class DisableIfInCartDirective implements OnChanges {
  @Input('appDisableIfInCart') isDisabled = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    if (this.isDisabled) {
      this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'none');
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.5');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'auto');
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
    }
  }
}
