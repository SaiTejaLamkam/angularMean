import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRedBlack]'
})
export class RedBlackDirective {

  element:ElementRef

  constructor(private el:ElementRef) { 
    el.nativeElement.style.color = 'red';
    el.nativeElement.style.backgroundColor = 'black';
    this.element = el

  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
      this.element.nativeElement.innerText += ' -- rendered by appRedBlack'
  }

}
