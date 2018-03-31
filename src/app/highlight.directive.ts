import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input()
  highlightColor: string;

  constructor(private el: ElementRef) {
    // el.nativeElement 를 쓰면 javascript Dom 에 접근할 수 있다.
    // el.nativeElement.style.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.highlightColor;
    // this.highlight(this.highlightColor || 'red');
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = null;
    // this.highlight(null);
  }
}
