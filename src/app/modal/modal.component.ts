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
import { EAnimation } from "@interfaces";
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
      transition(
        `void => ${EAnimation.SLIDE}`,
        [
          style({ transform: 'translateY(-50%) scaleY(0)' }),
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
  overlayStyle: any;
  modalStyle: any;
  configAnimation: EAnimation;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    private ref: ModalRef,
    private config: ModalConfig,
  ) {
    if (!config.overlay) {
      this.overlayStyle = {}
      if (this.config.x) {
        this.overlayStyle['left.px'] = this.config.x.toString();
      } else {
        this.overlayStyle['left.px'] = '0'
      }
      if (this.config.width) {
        this.overlayStyle['width.px'] = this.config.width.toString();
      } else {
        this.overlayStyle['right.px'] = '0'
      }
      if (this.config.y) {
        this.overlayStyle['top.px'] = this.config.y.toString()
      } else {
        this.overlayStyle['top.px'] = '48'
      }
      if (this.config.height) {
        this.overlayStyle['height.px'] = this.config.height.toString()
      } else {
        this.overlayStyle['bottom.px'] = '0'
      }
      this.modalStyle = {'width': '100%', 'height': '100%'}
    } else {
      this.overlayStyle = {'left.px': '0', 'right.px': '0', 'top.px': '48', 'bottom.px': '0'}
      this.modalStyle = {'width.px': this.config.width.toString(), 'min-height.px': this.config.height.toString()}
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
