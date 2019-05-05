import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Type, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { ModalModule } from './modal.module';
import { ModalComponent } from './modal.component';
import { ModalInjector } from './modal-injector';
import { ModalConfig } from './modal-config';
import { ModalRef } from './modal-ref';

@Injectable({
  providedIn: ModalModule
})
export class ModalService {
  modalComponentRef: ComponentRef<ModalComponent>;
  modalRef: ModalRef = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
  ) {}

  public open(componentType: Type<any>, config?: ModalConfig) {
    if (this.modalRef) return this.modalRef; // Allows only one modal at a time

    this.modalRef = this.appendModalComponentToBody(config || {});
    this.modalComponentRef.instance.childComponentType = componentType;

    return this.modalRef;
  }

  private appendModalComponentToBody(config: ModalConfig) {
    const map = new WeakMap();
    map.set(ModalConfig, config);

    this.modalRef = new ModalRef();
    map.set(ModalRef, this.modalRef);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const componentRef = componentFactory.create(new ModalInjector(this.injector, map));

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.modalComponentRef = componentRef;

    const sub = this.modalRef.afterClosed.subscribe(() => {
      this.removeModalComponentFromBody();
      sub.unsubscribe();
    });

    return this.modalRef;
  }

  private removeModalComponentFromBody() {
    this.appRef.detachView(this.modalComponentRef.hostView);
    this.modalComponentRef.destroy();
    this.modalRef = null;
  }
}
