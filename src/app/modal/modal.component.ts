import { Component, Type, ComponentFactoryResolver, ViewChild, OnDestroy, ComponentRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ModalDirective } from './modal.directive';
import { ModalRef } from './modal-ref';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations :[
    trigger('shift', [
      state('void', style({
        transform: 'translateX(100%)',
        opacity: 0,
      })),
      transition(':enter', animate(300)),
    ]),
  ],
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  @ViewChild(ModalDirective) insertionPoint: ModalDirective;
  componentRef: ComponentRef<any>;
  childComponentType: Type<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    private modalRef: ModalRef
  ) {}

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  onOverlayClicked(evt: MouseEvent) {
    this.modalRef.close();
    evt.stopPropagation();
  }

  onModalClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
