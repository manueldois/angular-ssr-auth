import { ViewContainerRef, Directive } from '@angular/core';

@Directive({
  selector: '[modalHost]'
})
export class ModalDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
