import {
  Component,
  Type,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
  ComponentRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { ModalDirective } from './modal.directive';
import { ModalRef } from './modal-ref';
import { trigger, style, animate, transition, } from '@angular/animations';
import { EAnimation } from "@interfaces";
import { ModalConfig } from "@modal/modal-config";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations :[
    trigger('shift', [
      transition(
        `void => ${EAnimation.FLY}`,
        [
          style({ transform: 'translateX(100%)' }),
          animate("300ms ease-out"),
        ]
      ),
      transition(
        `void => ${EAnimation.FOCUS}`,
        [
          style({ opacity: 0 }),
          animate("300ms ease-out"),
        ]
      ),
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
    private modalRef: ModalRef,
    private modalConfig: ModalConfig,
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
