import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Type, EmbeddedViewRef, ComponentRef,  InjectionToken, InjectFlags } from '@angular/core';
import { ModalModule } from './modal.module';
import { ModalComponent } from './modal.component';
import { ModalRef } from './modal-ref';
import { ModalConfig } from "@modal/modal-config";

class ModalInjector implements Injector {
  // Custom injector that takes injection from additional map
  constructor(private _parentInjector: Injector, private _additionalTokens: WeakMap<any, any>) {}

  get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
  get(token: any, notFoundValue?: any);
  get(token: any, notFoundValue?: any, flags?: any) {
    const value = this._additionalTokens.get(token); // Try to find injections in custom map from params
    return value ? value : this._parentInjector.get<any>(token, notFoundValue);
  }
}

@Injectable({ providedIn: ModalModule })
export class ModalService {
  modalComponentRef: ComponentRef<ModalComponent>;
  modalRef: ModalRef = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
  ) {}

  public open(componentType: Type<any>, config: ModalConfig = new ModalConfig()) {
    if (this.modalRef) return this.modalRef; // Allows only one modal at a time

    this.modalRef = this.appendModalComponentToBody(config);
    this.modalComponentRef.instance.childComponentType = componentType;

    return this.modalRef;
  }

  private appendModalComponentToBody(config: ModalConfig) {
    this.modalRef = new ModalRef();

    // Inject modal config and reference
    const map = new WeakMap();
    map.set(ModalConfig, config);
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