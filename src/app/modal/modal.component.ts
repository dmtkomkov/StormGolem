import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalDirective } from './modal.directive';
import { ModalRef } from './modal-ref';
import { animate, style, transition, trigger, } from '@angular/animations';
import { EAnimation, EModalType } from "@interfaces";
import { ModalConfig } from "@modal/modal-config";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations :[
    trigger('shift', [
      transition(
        `void => ${EAnimation.FLY}`,
        [
          style({ transform: 'translateX(-100%)' }),
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
  configClass: string;
  configAnimation: EAnimation;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    private ref: ModalRef,
    private config: ModalConfig,
  ) {
    switch(config.type) {
      case EModalType.LEFT_MENU: {
        this.configClass = 'left-menu';
        break;
      }
      case EModalType.DIALOG: {
        this.configClass = 'dialog';
        break;
      }
    }
    this.configAnimation = config.animation;
  }

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  onOverlayClicked(evt: MouseEvent) {
    this.ref.close();
    evt.stopPropagation();
  }

  onModalClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    let viewContainerRef: ViewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear(); // Destroys all views in this container.

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onClickedOutside(evt: Event) {
    this.ref.close();
    evt.stopPropagation();
  }
}
