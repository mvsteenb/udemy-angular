import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  //open: boolean = false;
  @HostBinding('class.open') open: boolean = false;

  constructor(
    private elRef : ElementRef,
    //private renderer : Renderer2
  ) { }
  
  /*@HostListener('click') toggleOpen(eventData: Event) {
    console.log("dropdown clicked !");
    /*if (this.open) {
      console.log("close dropdown !");
      this.renderer.removeClass(this.ElRef.nativeElement, "open");
    }
    else {
      console.log("open dropdown !");
      this.renderer.addClass(this.ElRef.nativeElement, "open");
    }
    this.open = !this.open;
  }*/

  // close dropdown by clicking anywhere on the document !
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    console.log("dropdown clicked !");
    this.open = this.elRef.nativeElement.contains(event.target) ? !this.open : false;
  }
}
