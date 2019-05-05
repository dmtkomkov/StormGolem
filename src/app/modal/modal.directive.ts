import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appInsertion]'
})
export class ModalDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
